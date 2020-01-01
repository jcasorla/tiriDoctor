const router = require('express').Router();
const userController = require('./../controllers/user');

module.exports = router.get('/:id', userController.getOneById)
    .put('/:id', userController.update)
    .put('/email/:id', userController.updateEmail)
    .put('/confirm/:id', userController.updateUsername)
    .put('/pwd/:id', userController.updatePwd);
