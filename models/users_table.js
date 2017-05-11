var  bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    // Giving the Author model a name of type STRING
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [2,140]
        }
      },
    email: {
      type: DataTypes.STRING,
      validate: {len: [1] }
      },
    password: {
      type: DataTypes.STRING,
      validate: {len: [4] }
      },
    token: {
      type: DataTypes.STRING,
      validate: {len: [1] }
      }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          users.hasMany(models.todos, {
            onDelete: "cascade"
          });
        },
        validPassword: function (password, passwd, done, user) {
          bcrypt.compare(password, passwd, function (err, isMatch) {
            if (err) {console.log(err);}
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      }
    },
    {
      dialect: "mysql"
    }
  );

  users.beforeCreate(function (user, options, fn) {
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      return salt;
    });
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      console.log(fn);
      return fn(null, user);
    });
  });
  return users;
};