'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Boards',
      [
        {
          id: '1',
          name: 'FirstBoard',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'SecondBoard',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'ThirdBoard',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    ),


  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Boards', null, {}),
};
