'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('votes',
    [
     {
      songId:    1,
      userId:    1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('votes', null, {});
  }
};
