// TODO refactor new connection

var redisClient = require('../module/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

// export a function
module.exports = function(io) {

  var collaborations = {};
  var socketIdToSessionId = {};

  var sessionPath = '/temp_session';
  
  // when 'connection' event happends,
  io.on('connection', (socket) => {
    console.log(socket.id);
    // get message
    let sessionId = socket.handshake.query['sessionId'];
    socketIdToSessionId[socket.id] = sessionId;
    console.log('collaborations', collaborations);
    if (!(sessionId in collaborations)) {
      // session is terminated previously
      redisClient.get(sessionPath + '/' + sessionId, data => {
          if (data) {
            console.log('session terminated previously, get back from redis');
            collaborations[sessionId] = {
              'cachedInstructions': JSON.parse(data),
              'participants': []
            }
          } else {
            console.log('creating new session');
            collaborations[sessionId] = {
              'cachedInstructions': [],
              'participants': []
            }
          }
          collaborations[sessionId]['participants'].push(socket.id);
      })
    } else {
      collaborations[sessionId]['participants'].push(socket.id);
    }

    socket.on('change', delta => {
      // log, easy for debuging
      console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
      // get session id based on socket.id
      let sessionId = socketIdToSessionId[socket.id];
      if (sessionId in collaborations) {
        // store the changes
        collaborations[sessionId]['cachedInstructions'].push(['change', delta, Date.now()]);

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

    socket.on('restoreBuffer', () => {
      let sessionId = socketIdToSessionId[socket.id];
      console.log('restore session from ' + sessionId, 'socket.id: ' + socket.id); 
      if (sessionId in collaborations) {
        let instructions = collaborations[sessionId]['cachedInstructions'];
        instructions.forEach(instruction => {
          socket.emit(instruction[0], instruction[1]);
        });
      } else {
        console.log('could not find any collcation for the session');
      }
    });

    socket.on('disconnect', () => {
      let sessionId = socketIdToSessionId[socket.id];
      let foundAndRemove = false;
      console.log('disconnect session from ' + sessionId, 'socket.id: ' + socket.id); 
      if (sessionId in collaborations) {
        let participants = collaborations[sessionId]['participants'];
        let index = participants.indexOf(socket.id);
        if(index >= 0) {
          participants.splice(index, 1);
          foundAndRemove = true;
          if (participants.length === 0) {
            let key = sessionPath + '/' + sessionId;
            let value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
            redisClient.set(key, value, redisClient.redisPrint);
            redisClient.expire(key, TIMEOUT_IN_SECONDS);
            delete collaborations[sessionId];
          }
        }
      }

      if (!foundAndRemove) {
        console.log("Warning: could not find the socket.id in collaborations");
      }
      
    });

    io.to(socket.id).emit('message', 'we are from server');
  })
}