'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    await queryInterface.bulkInsert(
      "Boards",
      [
        {
          id: 1,
          userId: 1,
          boardId: 1,
          name: "First Board",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          userId: 2,
          boardId: 2,
          name: "Second Board",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          userId: 3,
          boardId: 3,
          name: "Layout",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          userId: 4,
          boardId: 4,
          name: "Prepare a car",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
    ),
  

  down: async (queryInterface, Sequelize) => 
    await queryInterface.bulkInsert("Boards", null, {}),
};
