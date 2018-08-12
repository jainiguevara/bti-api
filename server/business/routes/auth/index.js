require('./../../../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./../../../data/mongoose');
const { Auth } = require('./../../../data/models/auth');
// const { authenticate } = require('./../../services/middleware/authenticate');

const route = express();

route.use(bodyParser.json());

route.post('/', (req, res) => {
  const body = _.pick(req.body, ['email']);
  const auth = new Auth(body);
  
  auth.save().then(() => {
    return auth.generateAuthToken().then(() => {
      res.send(auth);
    });
  }).catch((e) => {
    console.log(_.pick(e, [ 'name', 'message' ]));
    res.status(400).send({ name: 'DuplicateEmailError', message: 'Duplicate email address.'});
  });
});

// route.post('/generate', (req, res) => {
//   const body = _.pick(req.body, ['email']);
//   Auth.findByCredentials(body.email).then((auth) => {
//     return auth.generateAuthToken().then(token => {
//       res.header('x-auth', token).send(auth);
//     });
//   }).catch(e => {
//     res.status(400).send(e);
//   });
// });

// route.get('/me', authenticate, (req, res) => {
//   res.header('x-auth', req.token).send(req.auth);
// });

// route.delete('/me/token', authenticate, (req, res) => {
//   req.auth.removeToken(req.token).then(() => {
//     res.status(200).send();
//   }).catch(e => res.status(400).send(e));
// });

module.exports = route;
