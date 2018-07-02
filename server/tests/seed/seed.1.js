const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../data/models/todo');
const { User } = require('./../../data/models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'jaini@example.com',
  password: 'pass1234',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET )
  }]
}, {
  _id: userTwoId,
  email: 'mela@example.com',
  password: 'pass1234',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET )
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First',
  _creator: userOneId
},
{
  _id: new ObjectID(),
  text: 'Second',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTodos = function () {
  this.timeout(3500);
  return Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  });
};

const populateUsers = function () {
  this.timeout(3500);
  return User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  });
};

module.exports = { 
  todos, 
  populateTodos,
  users, 
  populateUsers 
};