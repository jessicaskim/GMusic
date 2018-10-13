'use strict';
module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  votes.associate = function(models) {
    // associations can be defined here
    votes.belongsTo(models.songs,{
      foreignKey: "songId"
    });
    votes.belongsTo(models.users,{
      foreignKey: "userId"
    });
  };
  return votes;
};