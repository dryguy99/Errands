module.exports = function(sequelize, DataTypes) {
  var tasks = sequelize.define("tasks", {
    // Giving the Author model a name of type STRING
    keyword: {
      type: DataTypes.STRING,
      validate: {len: [2,140] }
      },
    task: {
      type: DataTypes.STRING,
      validate: {len: [1] }
      },
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
                // A user (foreignKey) is required or a todo task can't be made
                tasks.belongsTo(models.todos, {
                  foreignKey: {
                    allowNull: false
                  }
                })
          }
      }
    }
  );
  return tasks;
};