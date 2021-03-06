require('./server/config/database');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bp = require('body-parser');
const router = require('./server/routes');
const flash = require('express-flash');

var expressJwt = require('express-jwt');
var config = require('./config.json');

app.use('/img',express.static( path.join(__dirname, './static/img')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// use JWT auth to secure the api
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true, cookie: {  maxAge: Date.now() + (5400 * 1000)  } }));

app.use('/api/', expressJwt({ secret: config.secret,
    getToken: function fromHeaderOrQuerystring (req) {
        return req.session.token;
    }
}).unless({ path: ['/api/auth/logout', '/api/auth/send'] }));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });




app.use(express.urlencoded({extended: true}));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(express.static( path.join(__dirname, './public/dist/public')));

app.use(flash());
app.use(router);

app.listen(8000, () => console.log('listening on port 8000'));
