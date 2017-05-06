
module.exports = function (sequelize, DataTypes) {
	var Burgers = sequelize.define("Burgers",{
		burger_name: {
			type: DataTypes.STRING,
			validate: { 
				len: [1,140] }
		},
		devoured: DataTypes.BOOLEAN
	},

		{
		
	      	// We're saying that we want our Creators to have Burgers
	  		classMethods: {
	    		associate: function(models) {
	          		// A Creator (foreignKey) is required or a Burger can't be made
	          		Burgers.belongsTo(models.Creators, {
	            		foreignKey: {
	              		allowNull: false
	            		}
	          		})
	    		}
	  		}
  		}
    );
	return Burgers;
};