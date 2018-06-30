const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const secret = 'las-pinas-#th3c00k`sS3#r%-tondo-manila';
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'jaini@example.com',
    password: 'pass1234',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, secret )
    }]
}, {
    _id: userTwoId,
    email: 'mela@example.com',
    password: 'pass1234'
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = function () {
    this.timeout(3500);
    return Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    });
};

const populateUsers = function () {
    this.timeout(3200);
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