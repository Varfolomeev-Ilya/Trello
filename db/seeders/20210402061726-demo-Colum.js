'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
  await queryInterface.bulkInsert(
    "Colums",
    [
      {
        name: "First Column",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Second Column",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Third Column",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Fourth Column",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
  ),

  down: async (queryInterface, Sequelize) => 
  await queryInterface.bulkInsert("Colums", null, {}),
  
};
