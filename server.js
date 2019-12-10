require('./server/config/database');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bp = require('body-parser');
const router = require('./server/routes');
const flash = require('express-flash');


//added
app.use('/img',express.static( path.join(__dirname, './static/img')));
// app.use('/css',express.static(__dirname + "./static/css"));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//end

app.use(express.urlencoded({extended: true}));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(express.static( path.join(__dirname, './public/dist/public')));
app.use(session({
    secret: 'at76uhcltpee8foi',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use(router);

app.listen(8000, () => console.log('listening on port 8000'));
