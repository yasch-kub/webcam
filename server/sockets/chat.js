const chat = require('../routes/chat');

module.exports = function(io) {
    io.on('connection', socket => {

        socket.on('chat message send', message => {
            var {
                text,
                chatID,
                authorID
            } = message;

            chat.saveMessage(text, chatID, authorID, (error, message) => {
                console.log(error);
                if (error)
                    throw new Error(error);
                console.log('dfsdf');
                io.sockets.emit('chat message added', {
                    text,
                    authorID,
                    date: message.date
                });
            })
        });
        
    });
};