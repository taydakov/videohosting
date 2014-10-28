var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var util = require('util');
var path = require('path');
var JSONStorage = require('./jsonstorage.js');

var app = express();

/* view render */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* load data */
var jsStorage = new JSONStorage('./datastorage.json');
console.log(jsStorage.data);

/* routes */
app.get('/', require('./routes/index'));
app.post('/upload', function(req, res) {
	var form = new multiparty.Form({
		autoFiles: true,
		uploadDir: path.join(__dirname, 'tmp')
	});

	form.parse(req, function(err, fields, files) {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('received upload:\n\n');
		res.end(util.inspect({fields: fields, files: files}));
		/* Save video to the data storage */
		jsStorage.push(files["videofile"][0].path);
		jsStorage.saveData();
	});

	return;
});

/* catch error */
app.use(function(req, res, next) {
	res.send(500, 'Internal Server Error');
});

/* web server */
app.set('webport', process.env.WEBPORT || 3000);
var server = app.listen(app.get('webport'), function() {
	console.log('server is on port ' + server.address().port);
});
