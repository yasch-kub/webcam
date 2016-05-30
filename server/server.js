'use strict';

const bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    db = require('./config');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const userRoutes = require('./routes/user').routes;
const chatRoutes = require('./routes/chat').routes;

mongoose.connect(`mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`);

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Routes
 */
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);

/**
 * Socket events
 */
require('./sockets/user')(io);
//require('./sockets/chat')(io);

server.listen(app.get('port'), 'localhost', () => {
    console.log(`Server run on ${app.get('port')}`);
});