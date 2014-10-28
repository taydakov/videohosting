var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/upload', multipart({
	uploadDir: "./tmp"
}), function (req, res) {
	return res.json(200, req.files);
});

app.get('/', function(req, res) {
	res.send('Hello World!');
});

var server = app.listen(8000, function(data) {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server is listening at " + host + ":" + port);
});