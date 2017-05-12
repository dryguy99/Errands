var db = require("../models");

module.exports = function(app) {
  app.get("/tasks", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.tasks.findAll({
      include: [db.todos]
    }).then(function(dbtasks) {
      res.json(dbtasks);
    });
  });

  app.get("/task:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.tasks.findOne({
      where: {
        id: req.params.id
      },
      include: [db.todos]
    }).then(function(dbtasks) {
      res.json(dbtasks);
    });
  });

  app.get("/mytask:keyword", function (req,res) {
    console.log('checking my tasks');
    db.tasks.findAll({
      where: {
        keyword: req.params.keyword
      }
    }).then(function(dbtasks) {
      res.json(dbtasks);
    });
  });
  

  app.post("/api/task", function(req, res) {
    db.tasks.create(req.body).then(function(dbtasks) {
      res.json(dbtasks);
    });
  });

  app.delete("/tasks:id", function(req, res) {
    db.tasks.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbtasks) {
      res.json(dbtasks);
    });
  });

};
