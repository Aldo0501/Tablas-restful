const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

async function create(req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const saltKey = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(password, saltKey);

  let user = new User({
    name: name,
    lastName: lastName,
    email: email,
    password: passwordHash,
    saltKey: saltKey
  });

  user.save().then((obj) => res.status(200).json({
        msg: "Usuario creado correctamente.",
        obj: obj,
      })).catch((ex) =>res.status(500).json({
        msg: "No se pudo almacenar el usuario.",
        obj: ex,
      }));
}

function list(req, res, next) {
  let page = req.params.page? req.params.page: 1;
  const options = {
    page: page,
    limit: 5
  };
  User.paginate({},options).then((objs) => res.status(200).json({
        msg: "Lista de usuarios",
        obj: objs
      })).catch((ex) => res.status(500).json({
        msg: "No se pudo obtener la lista de usuarios",
        obj: ex
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  User.findOne({ _id: id }).then((obj) => res.status(200).json({
        msg: `Usuario con el id ${id}`,
        obj: obj
      })).catch((ex) =>
      res.status(500).json({
        msg: "No se pudo consultar el usuario.",
        obj: ex
      }));
}

function replace(req, res, next) {
  const id = req.params.id;
  let name = req.body.name ? req.body.name : "";
  let lastName = req.body.lastName ? req.body.lastName : "";
  let email = req.body.email ? req.body.email : "";
  let password = req.body.password ? req.body.password : "";

  let user = new Object({
    _name: name,
    _lastName: lastName,
    _email: email,
    _password: password
  });

  User.findOneAndUpdate({ _id: id }, user, { new: true })
    .then((obj) => res.status(200).json({
        msg: "Usuario remplazado correctamente",
        obj: obj
      })).catch((ex) => res.status(500).json({
        msg: "No se pudo rempazar el usuario.",
        obj: ex
      }));
}

function update(req, res, next) {
  const id = req.params.id;
  let name = req.body.name;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  let user = new Object();
  if (name) user._name = name;
  if (lastName) user._lastName = lastName;
  if (email) user._email = email;
  if (password) user._password = password;

  User.findOneAndUpdate({ _id: id }, user)
    .then((obj) => res.status(200).json({
        msg: "Usuario actualizado correctamente.",
        obj: obj
      })).catch((ex) => res.status(500).json({
        msg: "No se pudo actualizar el usuario.",
        obj: ex
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;
  User.findByIdAndRemove({ _id: id }).then((obj) => res.status(200).json({
        msg: "Usuario eliminado correctamente",
        obj: obj,
      })).catch((ex) =>
      res.status(500).json({
        msg: "No se pudo eliminar el usuario.",
        obj: ex,
      }));
}
module.exports = {create, list, index, replace, update, destroy};