const _ = require('lodash');
const express = require('express');
const { ObjectID } = require('mongodb');

const { Todo } = require('./../../../data/models/todo');
const { authenticate } = require('./../../services/middleware/authenticate');

const route = express();

route.post('/', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }).catch((error) => res.status(400).send(error));
});

route.get('/', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.status(200).send({todos});
  }).catch((error) => res.status(400).send(error));
});

route.get('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({
    _id: ObjectID(id), 
    _creator: req.user._id 
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch(() => res.status(400).send());
});

route.delete('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOneAndRemove({ 
    _id: ObjectID(id), 
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch(() => res.status(400).send());
});

route.patch('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findOneAndUpdate({
    _id: ObjectID(id),
    _creator: req.user._id
  },
  {$set: body}, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch(() => res.status(400).send());
});

module.exports = route;