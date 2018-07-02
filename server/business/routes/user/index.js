require('./../../../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./../../../data/mongoose');
const { User } = require('./../../../data/models/user');
const { authenticate } = require('./../../services/middleware/authenticate');

const route = express();

route.use(bodyParser.json());

route.post('/', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => res.status(400).send(e));
});

route.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

route.post('/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(e => {
    res.status(400).send(e);
  });
});

route.delete('/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch(e => res.status(400).send(e));
});

module.exports = route;
