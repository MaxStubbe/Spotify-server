//
// ./api/v1/Songs.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Song = require('../model/song.model');

//
// Geef een lijst van alle Songs.
//
routes.get('/songs', function(req, res) {
    res.contentType('application/json');
    Song.find({})
        .then((Songs) => {
            // console.log(Songs);
            res.status(200).json(Songs);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke Songs. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/Songs/23
//
routes.get('/songs/:id', function(req, res) {
    res.contentType('application/json');
    Song.findById(req.params.id)
        .then((Song) => {
            // console.log(Songs);
            res.status(200).json(Song);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Voeg een Song toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/Songs
//
routes.post('/songs', function(req, res) {
    var new_Song = new Song(req.body);
    new_Song.save(function(err, task) {
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
routes.put('/songs/:id', function(req, res) {

    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "name" : req.body.name, 
        "description" : req.body.description
    };

    Song.findById(id)
        .then( Song => {
            Song.set(update);
            Song.save();
            res.status(200).json(Song);
            
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
routes.delete('/songs/:id', function(req, res) {
    var id = req.params.id;

    Song.findById(id)
        .then(Song => { 
            Song.remove();
            res.status(200).send("nummer verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;