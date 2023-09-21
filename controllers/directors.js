const express = require('express');

function sumar(req, res, next){
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    const result = n1 + n2;
    res.json({result});
}
function multiplicacion(req, res, next){
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    const result = n1 * n2;
    res.json({result});
}
/*function index(req, res, next){
    res.send('index create');
}*/
function division(req, res, next){
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    if (n2 === 0) {
      res.status(400).json({ error: 'No se puede dividir por cero' });
    } else {
      const result = n1 / n2;
      res.json({result});
    }
}
function potencia(req, res, next){
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    const result = Math.pow(n1, n2);
    res.json({result});
}
function resta(req, res, next){
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);
    const result = n1 - n2;
    res.json({result});
}

module.exports = {sumar, multiplicacion, /*index, */division, potencia, resta};
