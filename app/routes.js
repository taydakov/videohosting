'use strict'

module.exports = function(app, passport) {

	require('./routes/index')(app, passport);
	require('./routes/upload')(app, passport);
	require('./routes/signin')(app, passport);
	
	// app.post('/test', passport.authenticate('local'), function(req, res) {
	// 	console.log(req.user);
	// 	res.end();
	// });

}