const express = require('express');
const path = require('path');
// const authController = require('./../controllers/auth');
const router = express.Router();

// router.get('/', authController.sendHome);
// use session auth to secure the angular app files

//this is necessary
router.use('/', function (req, res, next) {
  if (req.path !== '/login' && !req.session.token) {
    console.log("catching route")
    return res.redirect('/login');
  }

  next();
});
// serve angular app files from the '/app' route
router.use('/', express.static('app'));

//end

router.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./public/dist/public/index.html'));
});

module.exports = router;
