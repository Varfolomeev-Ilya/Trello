'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          name: "1 task",
          text: "walking",
          createdAt: new Date(),
          updatedAt: new Date()  
        },
        {
          name: "2 task",
          text: "eating",
          createdAt: new Date(),
          updatedAt: new Date()  
        },
        {
          name: "3 task",
          text: "swiming",
          createdAt: new Date(),
          updatedAt: new Date()  
        },
        {
          name: "3 task",
          text: "dancing",
          createdAt: new Date(),
          updatedAt: new Date()  
        },
      ],
    ),

  down: async (queryInterface, Sequelize) => 
    await queryInterface.bulkDelete("Tasks", null, {}),
};
