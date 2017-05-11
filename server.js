// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require('passport');
var application = require('./routes/application.js');
var path = require("path");
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var Nexmo = require('nexmo');
var cookieParser = require('cookie-parser');
//var GoogleMapsLoader = require('google-maps');
SALT_WORK_FACTOR = 10;
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// fix CORS errors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(methodOverride("_method"));
app.use(cookieParser());

// GoogleMapsLoader.KEY = "AIzaSyAR_p6CcoLnuOI8m9N_LcEFzW5whT1d6X0";
// GoogleMapsLoader.load(function(google) {
//     new google.maps.Map(el, options);
//     console.log("el: " + el);
//     console.log("options: " + options);
// });
// GoogleMapsLoader.onLoad(function(google) {
//     console.log('I just loaded google maps api');
// });
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

//app.use(cookieParser());
app.use(session({
  secret: 'catsmakeforbettersecurity',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy 
  sess.cookie.secure = true // serve secure cookies 
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use('/admin', express.static(__dirname + "/admin"));
// app.all("/admin/*", requireLogin, function(req, res, next) {
//   console.log("running admin");
//   next(); // if the middleware allowed us to get here,
//           // just move on to the next route handler
// });
app.use('/public', express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.get('/login', application.IsAuthenticated, function(req, res) {
  console.log("login: " + IsAuthenticated);
     res.redirect('/admin');
  });
app.post('/authenticate',
  passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/public'
      })
    );
    app.get('/logout', application.destroySession);
    app.get('/signup');


//nexmo
// var nexmo = new Nexmo({
//     apiKey: "412fffbf",
//     apiSecret: "f17a3225c8f51740",
//   });

// nexmo.message.sendSms(
//     '12014645806', '17327789840', "This is working!!",
//       (err, responseData) => {
//         if (err) {
//           console.log('there was an error');
//           console.log(err);
//         } else {
//           //console.log(responseData);
//           console.log('message sent succesfully!');
//         }
//       }
//    );

// db.users.create({
//       name: "alyssa santopadre",
//       email: "alyssasantopadre.com",
//       password: "password",
//       phonenumber: "17327789840"
//     }).then(function(data) {

//       console.log(data);
//       console.log('it added!!');
//     });


// Routes =============================================================

require("./routes/login-routes.js");
require("./routes/user-api-routes.js")(app);
require("./routes/todo-api-routes.js")(app);
require("./routes/application.js");
require("./routes/task-api-routes.js")(app);

// require("./routes/author-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({

  //force: true

}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

function requireLogin(req, res, next) {
  console.log("test: " + req.isAuthenticated());
  if (req.isAuthenticated()) {
    return true;
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/public"); // or render a form, etc.
  }
}

