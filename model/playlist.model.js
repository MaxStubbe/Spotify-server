const mongoose = require('mongoose');
const connection = require('../config/mongo.db')
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: String,
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song'
    }]
});

const Playlist = mongoose.model('playlist', PlaylistSchema);

module.exports = Playlist;