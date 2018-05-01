 
// export a function
module.exports = function(io) {

  var collaborations = {};
  var socketIdToSessionId = {};

    // when 'connection' event happends,
    io.on('connection', (socket) => {
      console.log(socket);
      // get message
      let sessionId = socket.handshake.query['sessionId'];
      socketIdToSessionId[socket.id] = sessionId;
      if (!(sessionId in collaborations)) {
        collaborations[sessionId] = {
          'participants': []
        };
      }
      collaborations[sessionId]['participants'].push(socket.id);
      

      socket.on('change', delta => {
        // log, easy for debuging
        console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
        // get session id based on socket.id
        let sessionId = socketIdToSessionId[socket.id];
        if (sessionId in collaborations) {
          // get all participants on this session
          let participants = collaborations[sessionId]['participants'];
          // send changes to all participants
          for (let i = 0; i < participants.length; i++) {
            // skip the one who created this change
            if (socket.id != participants[i]) {
              io.to(participants[i]).emit("change", delta);
          } }
        } else {
          console.log("could not tie socket id to any collaboration");
        } 
      });
      io.to(socket.id).emit('message', 'we are from server');
    })
}