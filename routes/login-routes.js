var passport = require("passport"), 
LocalStrategy = require('passport-local').Strategy;


module.exports = function(app) {
	
  	
  	app.use(passport.initialize());
  	app.use(passport.session());
	

	passport.use(new LocalStrategy(
	  function(username, password, done) {
	    User.findOne({ username: username }, function (err, user) {
	      if (err) { return done(err); }
	      if (!user) {
	        return done(null, false, { message: 'Incorrect username.' });
	      }
	      if (!user.validPassword(password)) {
	        return done(null, false, { message: 'Incorrect password.' });
	      }
	      return done(null, user);
	    });
	  }
	));
// Accept the OpenID identifier and redirect the user to their OpenID
// provider for authentication.  When complete, the provider will redirect
// the user back to the application at:
//     /auth/openid/return
	app.post('/auth/openid', passport.authenticate('openid'));

// The OpenID provider has redirected the user back to the application.
// Finish the authentication process by verifying the assertion.  If valid,
// the user will be logged in.  Otherwise, authentication has failed.
	app.get('/auth/openid/return',
  		passport.authenticate('openid', { successRedirect: '/',
                                    	failureRedirect: '/login' }));
	

	app.post('/login', passport.authenticate('local', 
		function(req, res) {
	    // If this function gets called, authentication was successful.
	    // `req.user` contains the authenticated user.
	    res.redirect('/users/' + req.user.username);
  
  	}));


}
