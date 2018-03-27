//
// ./api/v1/Songs.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Playlist = require('../model/playlist.model');

//
// Geef een lijst van alle Songs.
//
routes.get('/playlists', function(req, res) {
    res.contentType('application/json');
    Playlist.find({})
        .then((playlist) => {
            // console.log(Songs);
            res.status(200).json(playlist);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke Songs. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/Songs/23
//
routes.get('/playlists/:id', function(req, res) {
    res.contentType('application/json');
    Playlist.findById(req.params.id)
        .then((playlist) => {
            // console.log(Songs);
            res.status(200).json(playlist);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Voeg een Song toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/Songs
//
routes.post('/playlists', function(req, res) {
    var new_playlist = new Playlist(req.body);
    new_playlist.save(function(err, task) {
      if (err)
        res.send(err);
        res.json(task);
    });
});

//
// Wijzig een bestaande Song. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de Song mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/Songs/23
//
routes.put('/playlists/:id', function(req, res) {

    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "name" : req.body.name, 
        
    };

    Playlist.findById(id)
        .then( playlist => {
            playlist.set(update);
            playlist.save();
            res.status(200).json(playlist);
            
        })
        .catch((error) => res.status(401).json(error));
      
});

//
// Verwijder een bestaande Song.
// Er zijn twee manieren om de id van de Songs mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/Songs/23
//
routes.delete('/playlists/:id', function(req, res) {
    var id = req.params.id;

    Playlist.findById(id)
        .then(playlist => { 
            playlist.remove();
            res.status(200).send("playlist verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;