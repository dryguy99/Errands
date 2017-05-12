var passport = require("passport"), 
LocalStrategy = require('passport-local').Strategy,

db = require('../models');

// searlize sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

//Desearialize Sessions

passport.deserializeUser(function(user, done) {
  db.users.find({where:{id:user.id}}).then(function(user){
    done(null, user);
  }).error(function(err) {
    done(err, null)
  });
});


// For Authentication Purposes
passport.use(new LocalStrategy(
  function(username, password, done){
    db.users.find({where:{username: username}}).then(function(user){
      passwd = user ? user.password: '';
      console.log("object type: " + typeof password);
      console.log("object2 type: " + typeof passwd);
      isMatch = db.users.validPassword(password, passwd, done, user);
    });
  }
));
