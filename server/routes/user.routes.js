const router = require('express').Router();
const userController = require('./../controllers/user');

module.exports = router.get('/:id', userController.getOneById);
//   .post('/login', authController.login)
//   .get('/send', authController.send)
//   .get('/logout', authController.logout);