
module.exports = function (sequelize, DataTypes) {
	var todos = sequelize.define("todos", {
		week_day: {
			type: DataTypes.STRING,
			validate: { 
				len: [1] }
		},
		task_id: {
			type: DataTypes.STRING,
		},
		start_time: {
			type: DataTypes.STRING,
			validate: {len: [1] }
		},
		duration: {
			type: DataTypes.STRING,
			validate: {len: [1] }
		},
		location: {
			type: DataTypes.STRING,
			validate: {len: [1] }
		},
		note: {
			type: DataTypes.STRING,
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
