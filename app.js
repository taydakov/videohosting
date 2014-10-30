'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var path = require('path');

var app = express();

/* view render */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middleware */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'fldkJSDFqw3423FDerfjdsh' }));
app.use(passport.initialize());
app.use(passport.session());

/* auth logic */
require('./config/passport')(passport);

/* routes */
require('./app/routes.js')(app, passport);

/* catch error */
app.use(function(req, res, next) {
	res.send(500, 'Internal Server Error');
});

/* web server */
app.set('webport', process.env.WEBPORT || 3000);
var server = app.listen(app.get('webport'), function() {
	console.log('server is on port ' + server.address().port);
});