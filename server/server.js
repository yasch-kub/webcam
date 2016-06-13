'use strict';

const bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    db = require('./config');

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const userRoutes = require('./routes/user').routes;
const chatRoutes = require('./routes/chat').routes;
const indexRoute = require('./routes/index').routes;

mongoose.connect(`mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');

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
app.use('/', indexRoute);

app.use('/', express.static(__dirname + '/public'));

/**
 * Socket events
 */
require('./sockets/user')(io);
//require('./sockets/chat')(io);

server.listen(app.get('port'), () => {
    console.log(`Server run on ${app.get('port')}`);
});
