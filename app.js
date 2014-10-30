'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var JSONStorage = require('./jsonstorage.js');

var app = express();

/* view render */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* routes */
app.use('/', require('./routes/index'));
app.use('/', require('./routes/upload'));

/* catch error */
app.use(function(req, res, next) {
	res.send(500, 'Internal Server Error');
});

/* web server */
app.set('webport', process.env.WEBPORT || 3000);
var server = app.listen(app.get('webport'), function() {
	console.log('server is on port ' + server.address().port);
});
