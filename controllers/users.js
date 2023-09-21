const express = require('express')

function create(req, res, iext){
    res.send('Users index')
}

function list(req, res, next) {
    res.send('users list');
}

function index(req, res, next){
    res.send('Users index')
}

function replace(req, res, next){
    res.send('Users replace')
}
function update(req, res, next){
    res.send('Users send')
}
function destroy(req, res, next){
    res.send('Users destroy')
}

module.exports = {
    create, list, index, replace, update, destroy
};