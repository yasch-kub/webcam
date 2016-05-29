const user = require('../routes/user');
const uuid = require('node-uuid');

const findUserById = require('../routes/user').findUserById;

module.exports = function(io) {
    io.on('connection', socket => {
        const userID = socket.request._query.userID;
        console.log('connection', userID);
        socket.join(`user-${userID}`);

        socket.on('add contact request', query => {
            console.log('request', query.contactID, query.userID);
            findUserById(query.userID, user => {
                io.to(`user-${query.contactID}`).emit('add contact request', user);
            })
        })
    });
};