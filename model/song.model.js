const mongoose = require('mongoose');
const connection = require('../config/mongo.db')
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: String,
    description: String
});

const Song = mongoose.model('song', SongSchema);

module.exports = Song;