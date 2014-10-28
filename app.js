var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var path = require('path');

var app = express();

/* view render */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/upload', multipart({
	uploadDir: "./tmp"
}), function (req, res) {
	return res.json(200, req.files);
});

/* routes */
app.get('/', require('./routes/index'));

/* catch error */
app.use(function(req, res, next) {
	res.end('Troubles!');
});

/* web server */
app.set('webport', process.env.WEBPORT || 3000);
var server = app.listen(app.get('webport'), function() {
	console.log('server is on port ' + server.address().port);
});