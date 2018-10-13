'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',
     [
      {
       name:      'Test User',
       email:     'test@123.com',
       password:  bcrypt.hashSync("adminadmin", 10),
       createdAt: Sequelize.literal('NOW()'),
       updatedAt: Sequelize.literal('NOW()')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
