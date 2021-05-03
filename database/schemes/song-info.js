const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const song = mongoose.Schema({
    "_id": String,
  "youtube": {
    "id": String,
    "url": String,
    "title": String,
    "image": String,
    "channels": [
      {
        "name": String,
        "id": String
      }
    ]
  },
  "spotify": {
    "id": String,
    "url": String,
    "uri": String,
    "title": String,
    "length": Number,
    "artists": [
      {
        "id": String,
        "uri": String,
        "url": String,
        "name": String
      }
    ]
  },
  "lyrics": String
})

module.exports = mongoose.model("tests", song)