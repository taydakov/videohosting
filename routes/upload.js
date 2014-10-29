var express = require('express');
var multiparty = require('multiparty');
var util = require('util');
var path = require('path');
var videodata = require('../videodata.js');

var router = express.Router();

router.post('/upload', function(req, res) {
	var form = new multiparty.Form({
		autoFiles: true,
		uploadDir: path.join(__dirname, '..', 'public', 'videos')
	});

	form.parse(req, function(err, fields, files) {
		/* Save video to the data storage */
		if (files.videofile && files.videofile[0].size !== 0) {
			videodata.push(path.basename(files.videofile[0].path));
			videodata.saveData();
		}
		res.redirect('/');
	});

	return;
});

module.exports = router;