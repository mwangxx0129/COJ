 
// export a function
module.exports = function(io) {
    // when 'connection' event happends,
    io.on('connection', (socket) => {
      console.log(socket);
      // get message
      var message = socket.handshake.query['message'];
      console.log(message);
      // reply to socket.id, emit 'message' event so that client side can get the message
      io.to(socket.id).emit('message', 'we are from server');
    })
}