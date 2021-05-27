const mongoose = require('mongoose');

const paths = new mongoose.Schema({
    '_id': {
        type: String,
        required: true
    },
    'count': {
        type: Number,
        required: true,
    }
})

const keys = new mongoose.Schema({
    '_id': {
        type: String,
        required: true
    },
    'paths': [paths],
})

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
    'keys': [keys]
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)