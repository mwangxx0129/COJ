const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb://wang:wang@dbh00.mlab.com:27007/cs503");

const restRouter = require('./routes/rest');

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.use('/api/v1', restRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})