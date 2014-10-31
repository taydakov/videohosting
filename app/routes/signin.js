'use strict'

module.exports = function(app, passport) {
	app.get('/signin', function(req, res) {
		res.render('signin', {
			
		});

		return;
	});

	app.post('/signin', function(req, res) {
		console.log(req.body);
	});

	app.post('/signup', function(req, res) {
		console.log(req.body);
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return app;
}