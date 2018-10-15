require('./../../../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./../../../data/mongoose');
const { User } = require('./../../../data/models/user');
const { authenticate, authorize } = require('./../../services/middleware/authenticate');

const route = express();

route.use(bodyParser.json());

route.post('/', authorize, (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);
  user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    console.log(_.pick(e, [ 'name', 'message' ]));
    res.status(400).send({ name: 'DuplicateEmailError', message: 'Duplicate email address.'});
  });
});

route.post('/login', authorize, (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user, error) => {
    if (error) {
      throw error;
    }
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(e => {
    console.log(e);
    res.status(400).send(e);
  });
});

route.get('/me/:id', authorize, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findOne({_id: ObjectID(id)}).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send({user});
  }).catch((e) => res.status(400).send(e));
});

route.get('/me', authorize, (req, res) => {
  res.header('x-auth', req.token).send(req.user);
});



route.delete('/me/token', authenticate, (req, res) => {
  req.user.removeTokens().then(() => {
    res.status(200).send();
  }).catch(e => res.status(400).send(e));
});

module.exports = route;
