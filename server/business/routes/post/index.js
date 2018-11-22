require('./../../../config/config');

const csv = require('csvtojson');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const soap = require('soap');
const moment = require('moment');

const { User } = require('./../../../data/models/user');
const { mongoose } = require('./../../../data/mongoose');
const { Transaction } = require('../../../data/models/transaction');
const { authenticate, authorize } = require('./../../services/middleware/authenticate');
const { parseCBPayload, parseCBAuth } = require('./utils/parseCBPayload');

const route = express();
route.use(bodyParser.json());

route.post('/metrobank', authenticate, (req, res) => {
  try {
    const data = req.body.data.split('\r\n');
    data.pop(); 
    data.shift();
    soap.createClient(__dirname + process.env.MB_WSDL, (err, client) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      let count = 0;
      csv()
        .fromString(req.body.data)
        .then(result => {
          result.map(record => {
            const newRecord = {
              _creator: req.body.userId,
              referenceNo: record.ftReferenceNo,
              data: JSON.stringify(record),
              raw: data[count].replace(/,/gi, '|'),
              bank: 'metrobank'
            };
            saveToDB(newRecord)
              .then((response) => {
                console.log('CREATE_TRANSACTION_REQUESTED', response);
                client.PosOnlTraAgt({ TM: newRecord.raw }, (err, result) => {
                  if (err) {
                    console.log('PosOnlTraAgtResult error', err);
                  } else {
                    const soapResult = result.PosOnlTraAgtResult.split('|');
                    const updates = {
                      _id: response._id,
                      statusCode: soapResult[0],
                      remarks: soapResult[1],
                      completedAt: soapResult[2] && moment(soapResult[2], 'DDMMYYYY').valueOf(),
                      completed: soapResult[2] && true
                    };
                    updateRecord(updates).then(response => {
                      console.log('PosOnlTraAgtResult response', response);
                    });
                  }
                });
              })
              .catch(e => {
                const messageBody = _.pick(e, [ 'name', 'message' ]);
                console.log(messageBody);
              });
            count++;
          });
        });
    }); 
    res.status(200).send({name: 'UploadInProgress', 'message': 'Transactions posting in-progress. Go to status table to check the progress.'});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

route.get('/metrobank', authenticate, (req, res) => {
  const token = req.header('x-auth');
  User.findByToken(token).then(user => {
    const startDate = req.query.startDate ? 
      moment(new Date(req.query.startDate)).startOf('day').valueOf() : 
      moment().startOf('day').valueOf();
    const endDate = req.query.endDate ? 
      moment(new Date(req.query.endDate)).endOf('day').valueOf() : 
      moment().endOf('day').valueOf();
    return Transaction.find({
      bank: 'metrobank',
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
      _creator: ObjectID(user._id)
    });
  }).then((result, err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result);
  }).catch(e => {
    const messageBody = _.pick(e, [ 'name', 'message' ]);
    console.log(messageBody);
    res.status(400).send(messageBody);
  });
});

route.post('/chinabank', authenticate, (req, res) => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const arg0 = parseCBAuth();
    const { data } = req.body;
    soap.createClient(__dirname + process.env.CB_WSDL, (err, client) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      let count = 0;
      csv()
        .fromString(data)
        .then(result => {
          result.map(record => {
            const arg1 = record;// parseCBPayload(record);
            const newRecord = {
              _creator: req.body.userId,
              referenceNo: record.applicationNumber,
              data: JSON.stringify(record),
              raw: JSON.stringify({arg0, arg1}),
              bank: 'chinabank'
            };
            console.log('CREATE_TRANSACTION_REQUESTED', newRecord);
            saveToDB(newRecord)
              .then((response) => {
                console.log('CREATE_TRANSACTION_RESPONSE', response);
                client.createTransaction({ arg0, arg1 }, (err, result) => {
                  if (err) {
                    console.log('CREATE_TRANSACTION_REQUESTED_ERROR', err);
                  } else {
                    console.log('UPDATE_TRANSACTION_REQUESTED', result);
                    const { return: {
                      errorMessageResponseList,
                      remittanceResponseList: {
                        coverNumber,
                      }
                    }, } = result;
                    const { errorCode, errorMessage } = errorMessageResponseList[0];
                    const updates = {
                      _id: response._id,
                      cb_coverNumber: coverNumber,
                      cb_errorCode: errorCode !== '099' ? errorCode : '',
                      cb_errorMessage: errorCode !== '099' ? errorMessage: '',
                    };
                    updateRecord(updates).then(response => {
                      console.log('UPDATE_TRANSACTION_RESPONSE', response);
                    });
                  }
                });
              })
              .catch(e => {
                const messageBody = _.pick(e, [ 'name', 'message' ]);
                console.log(messageBody);
              });
            count++;
          });
        });
    }); 
    res.status(200).send({ name: 'UploadInProgress', 'message': 'Transactions posting in-progress. Go to status table to check the progress.' });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

route.get('/chinabank', authenticate, (req, res) => {
  const token = req.header('x-auth');
  const startDate = req.query.startDate ? 
    moment(new Date(req.query.startDate)).startOf('day').valueOf() : 
    moment().startOf('day').valueOf();
  const endDate = req.query.endDate ? 
    moment(new Date(req.query.endDate)).endOf('day').valueOf() : 
    moment().endOf('day').valueOf();
  User.findByToken(token).then(user => {
    return Transaction.find({
      bank: 'chinabank',
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
      _creator: ObjectID(user._id)
    });
  }).then((result, err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    // get transaction status here
    soap.createClient(__dirname + process.env.CB_WSDL, (err, client) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      const arg0 = {
        ...parseCBAuth(),
        dtFrom: startDate,
        dtTo: endDate,
        // feedbackStatus: '',
        // coverNo: result.cb_coverNumber,
        // applicationNo: result.referenceNo,
      };
      client.inquireTransaction({ arg0 }, (err, reponse) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        console.log('inquireTransaction', reponse)

        // insert update transaction logic here
        res.status(200).send(result);
      });
    });
    //
  }).catch(e => {
    const messageBody = _.pick(e, [ 'name', 'message' ]);
    console.log(messageBody);
    res.status(400).send(messageBody);
  });
});


const saveToDB = (record) => {
  const body = _.pick(record, ['referenceNo', 'data', 'raw', 'bank', '_creator']);
  const trasaction = new Transaction(body);
  return trasaction.save();
};

const updateRecord = (updates) => {
  return Transaction.findOneAndUpdate({
    _id: ObjectID(updates._id)
  }, { $set: updates }, { new: true });
};

const isDuplicate = ({ ftReferenceNo }) => {
  return new Promise((resolve, reject) => {
    Transaction.find({ ftReferenceNo }, (err, res) => {
      if (err) {
        reject(err);
      }
      console.log(res.raw);
      if (res.length === 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    }).catch(e => {
      reject(e);
    });
  });
};

module.exports = route;