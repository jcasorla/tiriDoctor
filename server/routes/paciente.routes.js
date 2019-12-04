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
    .post('/:id/familiar', pacientes.createFamiliar)
    .put('/familiar/:id', pacientes.updateFamiliar)
    .post('/:id/gineco', pacientes.createGineco)
    .put('/gineco/:id', pacientes.updateGineco)
    .post('/:id/fisico', pacientes.createFisico)
    .put('/fisico/:id', pacientes.updateFisico)
    .post('/:id/problemas', pacientes.createProblema)
    .put('/problemas/:id', pacientes.updateProblema)
    .put('/problemas/delete/:id/', pacientes.deleteProblema)

module.exports = router;
