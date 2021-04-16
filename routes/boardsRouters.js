const express = require('express');
const controllers = require('../controllers/boardsController');
const { tokenChecker } = require('../middleware/updateToken');
const boardRouter = express.Router();

boardRouter.get('/boards', tokenChecker, controllers.getBoards);
boardRouter.post('/boards', tokenChecker, controllers.createBoard);
boardRouter.patch('/board', tokenChecker, controllers.changeBoardName);
boardRouter.delete('/boards', tokenChecker, controllers.deleteBoard);

module.exports = boardRouter;