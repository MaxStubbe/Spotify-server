const mongoose = require('mongoose');
const connection = require('../config/mongo.db')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'playlist'
    }]
});


const User = mongoose.model('user', UserSchema);

//beforeEach(() => {
//   connection.collections.user.drop();
//});

// Add a 'dummy' user (every time you require this file!)
const user = new User({
    name: 'Joe',
    recipes:[
        { name: "Pizza", 
        ingredients: [{
            name: "kaas", weight: 42069, price: "3,80"
        }]},
        { name:"Cake", 
        ingredients: [{
            name: "eieren", weight: 2, price: "4,00"
        }]}
    ]});

module.exports = User;