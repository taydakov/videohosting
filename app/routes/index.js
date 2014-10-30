'use strict'

var express = require('express');
var path = require('path');
var videodata = require('../videodata.js');

var router = express.Router();

router.get('/', function(req, res) {
	var videos = [];

	videodata.data.forEach(function(element, index){
		element.file = '/videos/' + path.basename(element.file);
		videos.push(element);
	});

	res.render('index', {
		videos: videos
	});
});

module.exports = router;