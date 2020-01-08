const express = require('express');
const path = require('path');
const router = express.Router();


router.use('/', function (req, res, next) {
  if (req.path !== '/login' && !req.session.token) {
    console.log("catching route")
    return res.redirect('/login');
  }

  next();
});
// serve angular app files from the '/app' route
router.use('/', express.static('app'));


router.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./public/dist/public/index.html'));
});

module.exports = router;
