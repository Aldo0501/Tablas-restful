const express = require('express');
const router = express.Router();
const controller = require('../controllers/directors');

//router.get('/:id', controller.index);
router.get('/:n1/:n2', controller.sumar);
router.post('/:n1/:n2', controller.multiplicacion);
router.put('/:n1/:n2', controller.division);
router.patch('/:n1/:n2', controller.potencia);
router.delete('/:n1/:n2', controller.resta);

module.exports = router;