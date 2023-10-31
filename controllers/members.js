const express = require('express')
const Member = require('../models/member')

function create(req, res, iext){
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;

    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    let member = new Member({
        name:name,
        lastName:lastName,
        phone:phone,
        address:address
    });

    member.save().then(obj => res.status(200).json({
        msg: "Socio creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar el socio",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page: 1;
    const options = {
        page: page,
        limit: 5
    };
    Member.paginate({},options).then(objs => res.status(200).json({
        msg: "Lista de members",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de members",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Member.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Member con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar el member",
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName: "";
    let phone = req.body.phone ? req.body.phone: "";
    let address = req.body.address ? req.body.address: "";

    let member = new Object({
        _name : name,
        _lastName: lastName,
        _phone: phone,
        _address: address
    });

    Member.findOneAndUpdate({"_id":id}, member, {new: true})
        .then(obj => res.status(200).json({
            msg: "Member reemplazado correctamente",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el Member",
            obj: ex
        }));
}
function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    let address = req.body.address;

    let member = new Object();
    if(name) member._name = name;
    if(lastName) member._lastName = lastName;
    if(phone) member._phone = phone;
    if(address) member._address = address;

    Member.findOneAndUpdate({"_id":id}, member)
        .then(obj => res.status(200).json({
            msg: "member actualizado correctamente",
            obj: ex
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el member",
            obj: ex
        }));
}
function destroy(req, res, next){
    const id = req.params.id;
    Member.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: "Member eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el member",
        obj: ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};