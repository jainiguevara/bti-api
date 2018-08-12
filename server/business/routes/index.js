require('./../../config/config');

const express = require('express');
const bodyParser = require('body-parser');

const route = express();

route.use(bodyParser.json());

route.get('/', (req, res) => {
  res.send({
    application: 'BTI API',
    version: '1.0'
  });
});

module.exports = route;