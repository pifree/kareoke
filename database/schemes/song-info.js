const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const song = mongoose.Schema({
    "_id": reqString,
  "youtube": {
    "id": reqString,
    "url": reqString,
    "title": reqString,
    "image": reqString,
    "channels": [
      {
        "name": reqString,
        "id": reqString
      }
    ]
  },
  "spotify": {
    "id": reqString,
    "url": reqString,
    "uri": reqString,
    "title": reqString,
    "length": Number,
    "artists": [
      {
        "id": reqString,
        "uri": reqString,
        "url": reqString,
        "name": reqString
      }
    ]
  },
  "lyrics": reqString
})

module.exports = mongoose.model("song-info", song)