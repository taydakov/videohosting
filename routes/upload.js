'use strict'

var express = require('express');
var multiparty = require('multiparty');
var util = require('util');
var path = require('path');
var videodata = require('../videodata.js');

var router = express.Router();

router.post('/upload', function(req, res) {
	var form = new multiparty.Form({
		autoFiles: true,
		uploadDir: path.join(__dirname, '..', 'public', 'videos'),
		maxFilesSize: 10 * 1024 * 1024 // 10MiB is the max file size
	});

	form.parse(req, function(err, fields, files) {
		if (err) return res.send(500);
		if (!fields || !fields.videotitle)
			return res.send(400);
		/* Save video to the data storage */
		if (files.file && files.file[0].size !== 0) {
			var todayDate = new Date();
			var todayStr = (todayDate.getMonth()+1) + "/" + todayDate.getDate() + "/" + todayDate.getFullYear();
			videodata.push({
				title: fields.videotitle[0],
				file: path.basename(files.file[0].path),
				date: todayStr,
			});
			videodata.saveData();
		}
		res.redirect('/');
	});

	return;
});

module.exports = router;