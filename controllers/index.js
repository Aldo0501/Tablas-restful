const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function home(req, res, next){
    res.render('index', {title: 'Express'})
}

function login(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = "e062dcb0bf3b2ab1bb1d1365a6fc81ed";

    User.findOne({"_email": email}).then(user=>{
        if(user){
            bcrypt.hash(password, user.saltKey, (err, hash) =>{
                if(err){
                    res.status(403).json({
                        msg:"Usuario y/o contraseña incorrectos",
                        obj: err
                    })
                }
                if(hash == user.password){
                    res.status(200).json({
                        msg: "login Ok",
                        obj: jwt.sign({data:user.data, exp: Math.floor(Date.now()/1000)+600}, JwtKey)
                    });
                }else{
                    res.status(403).json({
                        msg:"Usuario y/o contraseña incorrectos",
                        obj: null
                    })
                }
            });
        }else{
            res.status(403).json({
                msg:"Usuario y/o contraseña incorrectos",
                obj: null
            })
        }
    }).catch(ex => res.status(403).json({
        msg:"Usuario y/o contraseña incorrectos",
        obj: ex
    }));
}

module.exports = {home, login}