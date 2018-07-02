require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./business/routes/user');
//const todo = require('./business/routes/trna');
const app = express();

// middlewares
app.use(bodyParser.json());

// app.use('/todos', todo);
app.use('/user', user);
//app.use('/transaction', transaction);

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});

module.exports = app;
