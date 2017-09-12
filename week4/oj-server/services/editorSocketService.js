const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 60;

module.exports = function(io) {
    const collaborations = {};
    const socketIdToSessionId = {};
    const sessionPath = '/ojserver/'; // for redis
    io.on('connection', (socket) => {

        const sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);
        } else {
            // first one
            redisClient.get(sessionPath + sessionId, function(data) {
                if (data) {
                    console.log('session terminnated previously, pulling back....');
                    collaborations[sessionId] = {
                        'cachedInstructions': JSON.parse(data),
                        'participants': []
                    };
                } else {
                    // you are the first one ever worked on this problem
                    console.log('Nobody did this before, creating new session');
                    collaborations[sessionId] = {
                        'cachedInstructions': [],
                        'participants': []
                    }
                }
                // add the current socket.id to participants list
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }

        // change
        socket.on('change', delta => {
            console.log('change ' + socketIdToSessionId[socket.id] + ' ' + delta);
            // first put the change into collaboration cachedInstructions
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedInstructions'].push(
                    ['change', delta, Date.now()]
                );
            }
            // then forward the change to everyone else working on the same session
            forwardEvent(socket.id, 'change', delta);
        });

        // cursorMove
        socket.on('cursorMove', (cursor) => {
            console.log('change ' + socketIdToSessionId[socket.id] + ' ' + cursor);
            cursor = JSON.parse(cursor);
            // add socketId to the cursor object, so in UI, we can draw a cursor with different color for different client
            cursor['socketId'] = socket.id;

            // forward the cursor move event to everyone else working on the same session
            forwardEvent(socket.id, 'cursorMove', JSON.stringify(cursor));
        });

        // restoreBuffer
        socket.on('restoreBuffer', () => {
            // send the cachedInstructions to the newly joined client
            // please note that the instructions are either already in memory(if someone working on this session now)
            //      or it's just pulled from Redis (if this is the first client for this session now)
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                const cachedInstructions = collaborations[sessionId]['cachedInstructions'];
                for (let ins of cachedInstructions) {
                    // send ('change', delta) to client
                    // NOTE: we dont need a restoreBuffer on client side to receive data
                    //       because it's handled by 'change' event handler
                    socket.emit(ins[0], ins[1]);
                }
            } else {
                console.log('WARNING');
            }
        });

        // disconnect
        socket.on('disconnect', () => {
            const sessionId = socketIdToSessionId[socket.id];

            let foundAndRemove = false;
            if (sessionId in collaborations) {
                // first find all participants working in this session
                const participants = collaborations[sessionId]['participants'];
                // find the client that is leaving
                const index = participants.indexOf(socket.id);
                if (index >= 0) {
                    // remove the leaving client from participants
                    participants.splice(index, 1);
                    foundAndRemove = true;
                    
                    if (participants.length === 0) {
                        // if the client is the last client, save the cachedInstructions to redis
                        const key = sessionPath + sessionId;
                        const value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);

                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    } 
                }
            } else {
                // TODO: HOMEWORK
            }
            if (!foundAndRemove) {
                // TODO: HOMEWORK
            }
        });
    });

    const forwardEvent = function(socketId, eventName, dataString) {
        const sessionId = socketIdToSessionId[socketId];
            if (sessionId in collaborations) {
                const participants = collaborations[sessionId]['participants'];
                for (let item of participants) {
                    if (socketId != item) {
                        io.to(item).emit(eventName, dataString);
                    }
                }
            } else {
                console.log('You have a bug');
            }
    }
}