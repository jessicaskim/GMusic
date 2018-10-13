'use strict';
module.exports = (sequelize, DataTypes) => {
  const songs = sequelize.define('songs', {
    title: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    videoURL: DataTypes.STRING,
    videoDescription: DataTypes.STRING
  }, {});
  songs.associate = function(models) {
    // associations can be defined here
    songs.hasMany(models.votes,{
      foreignKey: 'songId'
    });
  };
  return songs;
};