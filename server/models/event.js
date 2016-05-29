const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    date: {
        required: true,
        type: Date
    },
    time: {
        required: true,
        type: Date
    },
    title: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Event', EventSchema);
