// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/todo/", function(req, res) {
    var query = {};
    if (req.query.users_id) {
      query.usersId = req.query.usesr_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.todos.findAll({
      where: query,
      include: [db.users]
    }).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/todo/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.todos.findOne({
      where: {
        id: req.params.id
      },
      include: [db.users]
    }).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  // POST route for saving a new post
  app.post("/maketodo", function(req, res) {
    db.todos.create(req.body).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/todo/:id", function(req, res) {
    db.todos.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  // PUT route for updating posts
  app.put("/api/todo", function(req, res) {
    db.todos.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbtodos) {
        res.json(dbtodos);
      });
  });
};
