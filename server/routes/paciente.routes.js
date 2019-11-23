const express = require('express');
const router = express.Router();
const pacientes = require('./../controllers/pacientes');

router.get('/', pacientes.all)
    .get('/:id', pacientes.getOneById)
    .post('/', pacientes.create)
    .put('/:id', pacientes.update)
    .delete('/:id', pacientes.delete)
    .post('/:id/actual', pacientes.createActual)
    .put('/actual/:id', pacientes.updateActual)
    .post('/:id/patologico', pacientes.createPatologico)
    .put('/patologico/:id', pacientes.updatePatologico)
    .post('/:id/nopatologico', pacientes.createNoPatologico)
    .put('/nopatologico/:id', pacientes.updateNoPatologico)

module.exports = router;
