const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const id = '5b29c26321f762235c5eb496';

// Todo.remove({}).then((results) => {
//     console.log(results);
// });

// Todo.findOneAndRemove({}).then((removedData) =>{

// });

// Todo.findByIdAndRemove('5b28c2f3635fe52110901fda').then((todo) => {
//     console.log(todo);
// });

Todo.findOneAndUpdate({_id: '5b29c26321f762235c5eb496'}).then((todo) => {
    console.log(todo);
});