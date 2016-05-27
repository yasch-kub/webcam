const user = require('../routes/user');
const uuid = require('node-uuid');

module.exports = function(io) {
    io.on('connection', socket => {
        const userID = socket.request._query.userID;

        console.log(userID);
        socket.join(`user ${userID}`);

        socket.on('add contact', (userID, contactID) => {
            user.findUserById(userID, user => {
                io.to(`user ${contactID}`).emit("add contact confirm", {
                    firstname: user.firstname,
                    lastname: user.lastname
                })
            });

           // socket.emit().
        })
    });
};