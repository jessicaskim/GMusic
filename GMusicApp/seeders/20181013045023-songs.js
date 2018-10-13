'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('songs',
     [
      {
       title:             'Glass Animals - Life Itself (Official Video)',
       imageURL:          'https://www.youtube.com/embed/yd9p4n5hLEg',
       videoURL:          0,
       videoDescription:  'LIFE ITSELF has arrived. the first song from our new record How To Be a Human Being, out now, its never met people before, so play nice. Buy it and stream it',
       createdAt:         Sequelize.literal('NOW()'),
       updatedAt:         Sequelize.literal('NOW()')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('songs', null, {});
  }
};
