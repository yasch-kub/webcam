const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ChatSchema = new mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

ChatSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Chat', ChatSchema);
