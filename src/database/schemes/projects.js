const mongoose = require('mongoose');

const paths = new mongoose.Schema({
    '_id': String,
    'Usage': Number
})

const projectSchema = new mongoose.Schema({
    '_id': {
        type: String,
        required: true,
    },
    'Title': String,
    'Description': String,
    'ApiKey': String,
    'Paths': [paths],
    'Users': [String]
}, {timestamps: true})

module.exports = mongoose.model('projects', projectSchema)