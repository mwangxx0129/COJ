const express = require('express');
const app = express();
const http = require('http');

const mongoose = require('mongoose');
mongoose.connect("mongodb://test:test@dbh00.mlab.com:27007/cs503");

var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io);

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

const path = require('path');
app.use(express.static(path.join(__dirname, '../public/')));

app.use('/', indexRouter);
app.use('/api/v1', restRouter);

const server = http.createServer(app);

io.attach(server);

server.listen(3000);
server.on('listening', () => {
  console.log('App listening on port 3000!');
})