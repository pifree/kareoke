const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    '_id': {
        type: String,
        required: true,
    },
    'email': {
        type: String,
        required: true,
    },
    'discordTag': {
        type: String,
        required: true
    },
    'avatar': String,
    'porjects': [String]
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)