//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) =>{
     if (error) {
         return console.log('Unable to connect to MongoDB server');
     }
     console.log('Connected to MongoDB server');
     const db = client.db('TodoApp');

     //deleteMany
    //  db.collection('Todos').deleteMany({text: 'take shit'}).then((result) => {
    //     console.log(result);
    //  })

     //deleteOne
    //  db.collection('Todos').deleteOne({text : 'take shit'}).then((result) => {
    //      console.log(result);
    //  })

     //findOneAndDelete
    //  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    //  })

    // db.collection('Users').deleteMany({name: 'Jaini'}).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log('Unable to delete user', error);
    // })

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5aed1fea1dc4b908f40e9d47')})
    .then((result) => {
        console.log(result);
    }, (error) => {
        console.log('Unable to delete user', error);
    })

    //client.close();
});