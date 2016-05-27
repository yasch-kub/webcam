'use strict';

const express = require('express'),
    mongoose = require('mongoose'),
    async = require('async'),

    Message = require('../models/message'),
    Chat = require('../models/chat'),
    User = require('../models/user');

let router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

router.post('/', (req, res) => {
    let chat = new Chat();
    chat
        .save()
        .then(
            chat => res.send(chat),
            error => res.send(error)
        )
});

router.get('/', (req, res) => {
   Chat
       .find()
       .populate('messages')
       .exec()
       .then(
           chats => res.json(chats),
           error => res.json(error)
       )
});

router.get('/:id', (req, res) => {
   Chat
       .findById(ObjectId(req.params.id))
       .populate('messages users')
       .exec()
       .then(
           chat => res.json(chat),
           error => res.json(error)
       )
});

router.get('/:id/users', (req, res) => {
   Chat
       .findById(ObjectId(req.params.id))
       .populate('users', 'firstname lastname avatar')
       .select('users')
       .exec()
       .then(
           chat => res.json(chat.users),
           error => res.json(error)
       );
});

router.post(
    '/:id/users',
    (req, res) =>
        addUserToChat(req.params.id, req.body.userID, (error, result) => res.send(result))
);


router.get('/:id/messages', (req, res) => {
    Chat
        .findById(ObjectId(req.params.id))
        .populate('messages')
        .select('messages')
        .exec()
        .then(
            chat => res.json(chat.messages),
            error => res.send(error)
        );
});

router.post(
    '/:id/messages', 
    (req, res) =>
        saveMessage(req.body.message, req.params.id, req.body.userID, (error, result) => res.send(result))
);

module.exports.saveMessage = function saveMessage(text, chatID, userID, callback) {
    async.waterfall([

        // Get user
        callback => {
            User
                .findById(ObjectId(userID))
                .exec()
                .then(
                    user => callback(null, user),
                    error => callback(error, null)
                )
        },

        // Save message
        (author, callback) => {
            let message = new Message({
                text,
                author
            });

            message
                .save()
                .then(
                    message => callback(null, message),
                    error => callback(error, null)
                )
        },

        // Get chat
        (message, callback) => {
            Chat
                .findById(ObjectId(chatID))
                .exec()
                .then(
                    chat => callback(null, chat, message),
                    error => callback(error, null)
                )
        },

        // Save message to chat
        (chat, message, callback) => {
            chat.messages.push(message);
            chat
                .save()
                .then(
                    chat => callback(null, message),
                    error => callback(error, null)
                )
        }
    ],

    (error, result) => {
        if (error)
            return callback(error, null);

        callback(null, result);
    });
};

function addUserToChat(chatID, userID, callback) {
    async.waterfall([

        // Get user
        callback => {
            User
                .findById(ObjectId(userID))
                .exec()
                .then(
                    user => callback(null, user),
                    error => callback(error, null)
                )
        },

        // Get chat
        (user, callback) => {
            Chat
                .findById(ObjectId(chatID))
                .exec()
                .then(
                    chat => callback(null, chat, user),
                    error => callback(error, null)
                )
        },

        // Add user to chat
        (chat, user, callback) => {
            chat.users.indexOf(user.id) === -1
            && chat.users.push(user);

            chat
                .save()
                .then(
                    chat => callback(null, chat),
                    error => callback(error, null)
                )
        }
    ],

    (error, result) => {
        if (error)
            return callback(error, null);

        callback(null, result);
    })
};

module.exports.findUser = function(userID, callback) {

};

module.exports.routes = router;
