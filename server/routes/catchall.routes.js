const express = require('express');
const path = require('path');
const router = express.Router();


router.get("/login", (req, res) => {
    
    
  res.render('login');
})
router.get("/register", (req, res) => {
    
    
  res.render('register');
})

router.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./public/dist/public/index.html'));
});

module.exports = router;
