const express = require('express');
const controllers = require('../controllers/boardsController');
const { tokenChecker } = require('../middleware/updateToken');
const boardRouter = express.Router();

boardRouter.get('/boards', controllers.getBoards);
boardRouter.post('/boards', controllers.createBoard);
boardRouter.patch('/board',controllers.changeBoardName);
boardRouter.delete('/boards', controllers.deleteBoard);

module.exports = boardRouter;