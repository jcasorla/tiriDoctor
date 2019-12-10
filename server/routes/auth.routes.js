const router = require('express').Router();
const authController = require('./../controllers/auth');

module.exports = router.get("/login", (req, res) => {  
    res.render('login');
  })
  .get("/register", (req, res) => {
      
      
    res.render('register');
  })
  .post('/register', authController.register)
  .post('/login', authController.login);
  // .post('/logout', authController.logout)
  // .post('/verify', authController.verify)