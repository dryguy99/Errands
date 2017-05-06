
module.exports = function (sequelize, DataTypes) {
	var todos = sequelize.define("todos",{
		todos_task: {
			type: DataTypes.STRING,
			validate: { 
				len: [1] }
		}
	},

		{
		
	      	// We're saying that we want our User to have To do tasks
	  		classMethods: {
	    		associate: function(models) {
	          		// A user (foreignKey) is required or a todo task can't be made
	          		todos.belongsTo(models.users, {
	            		foreignKey: {
	              		allowNull: false
	            		}
	          		})
	    		}
	  		}
  		}
    );
	return todos;
};
