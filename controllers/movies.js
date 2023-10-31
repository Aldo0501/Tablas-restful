const express = require('express')
const Director = require('../models/director')
const Movie = require('../models/movie')


async function create(req, res, next){
    const title = req.body.title;
    const directorId = req.body.directorId;

    let director = await Director.findOne({"_id": directorId});
    let movie = new Movie({
        title: title,
        director: director
    });

    movie.save().then(obj => res.status(200).json({
        msg: "Pelicula almacenada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear la pelicula",
        obj: ex
    }));
}

function list(req, res, next) {
    Movie.find().populate("_director").then(objs => res.status(200).json({
        msg: "Lista de peliculas",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear la pelicula",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Movie.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Movie con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la movie",
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let title = req.body.title ? req.body.title : "";
    let directorId = req.body.directorId ? req.body.directorId: "";
    let name = req.body.name ? req.body.name: "";

    let movie = new Object({
        _title : title,
        _directorId: directorId
    });

    let director = new Object({
        _name : name,
        _lastName: lastName
    });

    Director.findOneAndUpdate({"_id":id}, director, movie, {new: true})
        .then(obj => res.status(200).json({
            msg: "Movie reemplazada correctamente",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la movie",
            obj: ex
        }));
}
function update(req, res, next){
    const id = req.params.id;
    let title = req.body.title;
    let directorId = req.body.directorId;

    let movie = new Object();
    if(title) director._title = title;
    if(directorId) director._directorId = directorId;

    Movie.findOneAndUpdate({"_id":id}, movie)
        .then(obj => res.status(200).json({
            msg: "Movie actualizado correctamente",
            obj: ex
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el movie",
            obj: ex
        }));
}
function destroy(req, res, next){
    const id = req.params.id;
    Movie.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: "Movie eliminada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar la movie",
        obj: ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};