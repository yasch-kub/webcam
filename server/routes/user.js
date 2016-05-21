'use strict';

const express = require('express'),
    jwt = require('jwt-simple'),
    mongoose = require('mongoose'),
    async = require('async');

const User = require('../models/user');

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

    async.waterfall([
        callback => {
           User
               .findOne({ email })
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
            return res.end(res.writeHead(401, error));
        res.status(200).json(user)
    });
});

router.get('/', (req, res) => {
    User
        .find()
        .exec()
        .then(
            users => res.json(users),
            error => res.json(error)
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

router.get('/:id/contacts', (req, res) => {
    User
        .find(ObjectId(req.params.id))
        .populate('contacts')
        .select('contacts')
        .exec()
        .then(
            contacts => res.status(200).json(contacts),
            error => res.send(error)
        )
});

// TODO: Add new contact
router.post(':id/contacts', (req, res) => {
    
});

module.exports = router;