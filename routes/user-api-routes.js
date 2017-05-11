var db = require("../models");

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

  app.post("/api/user", function(req, res) {
    db.users.create(req.body).then(function(dbusers) {
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
