var db = require("../models");
var fs = require('fs');
module.exports = function(app) {
  
  app.get("/api/user", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.users.findAll({
      include: [db.todos]
    }).then(function(dbusers) {
      res.json(dbusers);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.todos]
    }).then(function(dbusers) {
      res.json(dbusers);
    });
  });


  app.post("/register", function(req, res) {
    console.log("signup called: ");
    var currentUser = req.body.username;
    console.log(exports.currentUser);
    db.users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phonenumber: req.body.phonenumber
    }).then(function(dbusers) {
      console.log(dbusers.id);
      var currentId = dbusers.id;
      fs.writeFile("user.txt", currentUser + " , " + currentId);

      res.json(dbusers);
    });
  });

  app.delete("/api/user/:id", function(req, res) {
    db.users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbusers) {
      res.json(dbusers);
    });
  });

};

