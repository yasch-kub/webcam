'use strict';

const path = require('path')
const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

module.exports.routes = router;
