const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
   author: {
       required: true,
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
    text: {
        required: true,
        type: String
    },
    date: {
        type: Date
    }
});

MessageSchema.pre('save', function(next) {
    this.date = Date.now();
    return next();
});

module.exports = mongoose.model('Message', MessageSchema);
