'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
  await queryInterface.bulkInsert(
    "Mediators",
    [
      {
        boardId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        boardId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        boardId: 3,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        boardId: 4,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()  
      },
    ],
  ),

  down: async (queryInterface, Sequelize) => 
    await queryInterface.bulkDelete("Mediators", null, {}),
};
