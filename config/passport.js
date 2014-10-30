var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

	passport.use(new LocalStrategy(
		function(username, password, done) {
			console.log("LocalStrategy");
			if (username === 'user' && password === 'pass')
				return done(null, {
					username: username,
					role: 'user',
					provider: 'local_in_passport.js'
				});
			else
				return done(null, false);
		}
	));

	passport.serializeUser(function(user, done) {
		console.log('SERIALIZATION');
		console.log(user);
		done(null, user.username);
	});

	passport.deserializeUser(function(id, done) {
		console.log('DESERIALIZATION');
		console.log(id);
		done(null, {
			username: username,
			role: 'user',
			provider: 'local_in_passport.js'
		});
	});

};