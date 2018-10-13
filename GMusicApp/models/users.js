'use strict';
const bcrypt    = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 3 and 99 characters'
        }
      }
    }
  });

  users.beforeCreate(function(createdUser, options) {
    if (!createdUser.password) { return null; }
    var hash = bcrypt.hashSync(createdUser.password, 10);
    createdUser.password = hash;
    return createdUser;
  });

  users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  users.prototype.toJSON = function() {
    var jsonUser = this.get();
    delete jsonUser.password;
    return jsonUser;
  };
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.votes, {
      foreignKey: 'userId'
    });
  };
  return users;
};