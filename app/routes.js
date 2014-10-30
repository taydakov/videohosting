module.exports = function(app, passport) {

	app.use('/', require('./routes/index'));
	app.use('/', require('./routes/upload'));
	app.get('/test', function(req, res, next) {
		console.log('1234');
		passport.authenticate('local', function(err, user, info) {
			console.log(err);
			console.log(user);
			console.log(info);
		});
		res.end();
	});

};