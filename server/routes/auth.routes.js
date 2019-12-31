const router = require('express').Router();
const authController = require('./../controllers/auth');

module.exports = router.get("/login", (req, res) => {  
    res.render('login');
  })
  .get("/register", (req, res) => {
      
      
    res.render('register');
  })
  .get("/reset", (req, res) => {
      
      
    res.render('reset');
  })
  .get("/tiri256Especial", (req, res) => {
      
      
    res.render('specialreset');
  })
  .post('/register', authController.register)
  .post('/login', authController.login)
  .get('/send', authController.send)
  .get('/logout', authController.logout)
  .post('/update', authController.updatePwd)
  .post('/updateTiri256', authController.updateSpecial);
