const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require('./../../data/models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  firstName: 'Jaini',
  lastName: 'Guevara',
  email: 'jaini@example.com',
  password: 'pass1234',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET )
  }]
}, {
  _id: userTwoId,
  firstName: 'Carmela',
  lastName: 'Dumanlang',
  email: 'mela@example.com',
  password: 'pass1234',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET )
  }]
}];

const populateUsers = function () {
  this.timeout(5000);
  return User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  });
};

module.exports = {
  users, 
  populateUsers 
};