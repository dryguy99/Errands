var passport = require("passport"), 
LocalStrategy = require('passport-local').Strategy,
application = require('./application');


module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());
	app.get('/home', application.IsAuthenticated);
  	app.post('/authenticate',
  		passport.authenticate('local', {
  			successRedirect: '/home',
  			failureRedirect: '/signup'
  		})
  	)
  	app.get('/logout', application.destroySession);
  	app.get('/signup');
  	//app.post('/register');

}
