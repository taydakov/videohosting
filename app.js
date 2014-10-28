var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello World!');
});

var server = app.listen(8000, function(data) {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server is listening at " + host + ":" + port);
});