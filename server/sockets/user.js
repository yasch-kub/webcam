const user = require('../routes/user');
const uuid = require('node-uuid');

const findUserById = require('../routes/user').findUserById;
const chat = require('../routes/chat');

module.exports = function(io) {
    io.on('connection', socket => {
        const userID = socket.request._query.userID;

        console.log('user connected', userID);
        socket.join(`user-${userID}`);

        socket.on('add contact request', query => {
            console.log('request', query.contactID, query.userID);
            findUserById(query.userID, user => {
                io.to(`user-${query.contactID}`).emit('add contact request', user);
            })
        });

        socket.on('add contact request confirm', query => {
            console.log('request confirm', query.contactID, query.userID);
            io.to(`user-${query.contactID}`).emit('add contact request confirm', query.contactID, query.userID);
        });

        socket.on('connect to chat', query => {
            console.log('join to chat', query.chatID)
            socket.join(`chat-${query.chatID}`);
        });

        socket.on('disconnect from chat', query => {
            socket.leave(`chat-${query.chatID}`);
            console.log('leave from chat', query.chatID)
        });

        socket.on('chat message send', message => {

            console.log("Message send", message);

            var {
                text,
                chatID,
                authorID
            } = message;

            chat.saveMessage(text, chatID, authorID, (error, message) => {
                if (error)
                    throw new Error(error);

                io.sockets.in(`chat-${chatID}`).emit('chat message added', {
                    text,
                    authorID,
                    date: message.date
                });
            })
        });

        socket.on('call request', query => {
            console.log("Call request", query.callerID, query.receiverID);
            findUserById(query.callerID, user => io.to(`user-${query.receiverID}`).emit('call request', user))
        })

        socket.on('call request confirm', query => {
            console.log("Call request confirm", query.callerID);
            io.to(`user-${query.callerID}`).emit('call request confirm');
        })



    });
};