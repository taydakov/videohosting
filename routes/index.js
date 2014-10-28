var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {
		par1: "Hello, world"
	});
});

module.exports = router;