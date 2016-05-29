'use strict';

const express = require('express'),
    mongoose = require('mongoose'),
    async = require('async');

const User = require('../models/user');
const Chat = require('../models/chat');
const Event = require('../models/event');

let router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

// TODO: Check for login and redirect if checking is not passed
router.use((req, res, next) => {
    next();
});

router.post('/login', (req, res) => {
    let {
       email,
       password
    } = req.body;

    console.log(email);

    async.waterfall([
        callback => {
        console.log('step 1');
                User
                    .findOne({ email })
                    .select("+password")
                    .populate('contacts')
                    .exec()
                    .then(
                       user => user
                           ? callback(null, user)
                           : callback('No user find with current email', null),
                       error => callback(error, null)
                    )
        },

        (user, callback) => {
            user
                .comparePassword(password, callback)
                .then(
                    () => callback(null, user)
                )
                .catch(
                    error => callback(error, null)
                )
        }

    ], (error, user) => {
        if (error)
            return res.status(403).json(error);
        res.status(200).json(user);
    });
});

router.get('/', (req, res) => {
    let { search } = req.query;
    search = search.toLowerCase().split(' ');

    async.waterfall([
        callback => User
            .find()
            .exec()
            .then(
                users => callback(null, users),
                error => res.json(error, null)
            )
        ,

        (users, callback) => {
            callback(null, users.filter(user => {
                let firstname = user.firstname.toLowerCase(),
                    lastname = user.lastname.toLowerCase();
                return firstname.indexOf(search[0]) == 0
                    || firstname.indexOf(search[1]) == 0
                    || lastname.indexOf(search[0]) == 0
                    || lastname.indexOf(search[1]) == 0
            }))
        }
    ], (error, users) => {
        if (error)
            return res.end(res.writeHead(401, error));
        res.json(users);
    })

});

router.get('/:id', (req, res) => {
    User
        .findById(ObjectId(req.params.id))
        .exec()
        .then(
            user => res.status(200).json(user),
            error => res.send(error)
        )
});

router.post('/', (req, res) => {
    let {
        firstname,
        lastname,
        email,
        password
    } = req.body;
    
    let user = new User({
        firstname,
        lastname,
        email,
        password
    });

    user
        .save()
        .then(
            user => res.json({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                avatar: user.avatar
            }),
            error => res.json(error)
        );
});

router.delete('/:id/contacts', (req, res) => {
    async.waterfall([
        callback => User
            .findById(ObjectId(req.params.id))
            .populate('contacts')
            .select('contacts')
            .exec()
            .then(
                user => callback(null, user),
                error => callback(error, null)
            ),

        (user, callback) => {
            user.contacts = [];
            user.save((error, user) => {
                if (error)
                    return callback(error, null);
                callback(null, user)
            })
        }
    ], (error, user) => {
        if (error)
            res.status(403).json(error);
        res.status(200).json(user);
    })

});

router.get('/:id/contacts', (req, res) => {
    console.log('get contacts');
    User
        .findById(ObjectId(req.params.id))
        .populate('contacts')
        .select('contacts')
        .exec()
        .then(
            user => res.status(200).json(user.contacts),
            error => res.status(403).json(error)
        );
});

router.post('/:id/contacts', (req, res) => {
    let newContactId = req.body.id;

    async.waterfall([
        callback => User
            .findById(ObjectId(req.params.id))
            .exec()
            .then(
                user => callback(null, user),
                error => callback(error, null)
            ),

        (user, callback) => User
            .findById(ObjectId(newContactId))
            .exec()
            .then(
                newContact => callback(null, user, newContact),
                error => callback(error, null)
            ),

        (user, newContact, callback) => {
            console.log(user, newContact)
            if(!user.contacts.find(user => user == newContact.id))
                user.contacts.push(newContact);

            user.save((error, user) => {
                if (error)
                    return callback(error);
                callback(null)
            })
        },

        callback => User
            .findById(ObjectId(req.params.id))
            .populate('contacts')
            .select('contacts')
            .exec()
            .then(
                user => callback(null, user.contacts),
                error => callback(error, null)
            )

    ], (error, contacts) => {
        if (error)
            return res.status(401).json(error);
        res.status(200).json(contacts);
    })
});

router.get('/:id/events', (req, res) => {
    User
        .findById(ObjectId(req.params.id))
        .populate('events')
        .select('events')
        .exec()
        .then(
            user => res.status(200).json(user.events),
            error => res.status(403).json(error)
        );
});

router.post('/:id/events', (req, res) => {
    let{
        title, date, time
    } = req.body;
    
    async.waterfall([
        callback => User
            .findById(ObjectId(req.params.id))
            .exec()
            .then(
                user => callback(null, user),
                error => callback(error, null)
            ),
        
        (user, callback) => {
            let event = new Event({
                title, date, time
            });

            event.save((error, event) => {
                if (error)
                    return callback(error);
                callback(null, user, event)
            })
        },
        
        (user, event, callback) => {
            user.events.push(event);
            
            user.save((error, user) => {
                if (error)
                    return callback(error);
                callback(null, event)
            })
        }
    ], (error, event) => {
        if (error)
            return res.status(401).json(error);
        res.status(200).json(event);
    })
});

module.exports.findUserById = function(id, callback) {
    User
        .findById(ObjectId(id))
        .exec()
        .then(
            user => callback(user),
            error => console.log(error)
        );
};

module.exports.routes = router;