const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Config = require('../config/db');

//console.log('passport');

module.exports = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = Config.secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		// console.log(jwt_payload.data);
		// console.log('\n');
		User.getUserById(jwt_payload.data._id, (err, user) => {
			if(err){
				return done(err, false);
			}

			if (user){
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));
}
