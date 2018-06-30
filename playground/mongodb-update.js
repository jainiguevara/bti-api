//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) =>{
     if (error) {
         return console.log('Unable to connect to MongoDB server');
     }
     console.log('Connected to MongoDB server');
     const db = client.db('TodoApp');

    //  db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5aed2998777d5918a0fe88e7')
    //  }, { 
    //      $set: {
    //          completed: true
    //      }       
    //  }, {
    //      returnOriginal: false
    //  }).then((result) => {
    //      console.log(result);
    //  })

     db.collection('Users').findOneAndUpdate({
         _id: new ObjectID('5aed3253c7d1e027f81209e1')
     }, {
         $set: {
             name: 'Mela'
         },
         $inc: {
             age: -5
         }
     }, {
         returnOriginal : false
     }).then((result) => {
         console.log(result);
     })

    //client.close();
});