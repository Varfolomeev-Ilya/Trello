const express = require('express');
const controllers = require ('../controllers/boardsController');
const boardRouter = express.Router();

boardRouter.post("/boards", controllers.createBoard);

module.exports = boardRouter;