const chat = require('../routes/chat');
const uuid = require('node-uuid');

module.exports = function(io) {
    io.on('connection', socket => {
        

        socket.on('chat message send', message => {
            var {
                text,
                chatID,
                authorID
            } = message;

            chat.saveMessage(text, chatID, authorID, (error, message) => {
                if (error)
                    throw new Error(error);
                io.sockets.emit('chat message added', {
                    text,
                    authorID,
                    date: message.date
                });
            })
        });
        
    });
};