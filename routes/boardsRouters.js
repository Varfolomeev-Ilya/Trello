const express = require('express');
const controllers = require('../controllers/boardsController');
const { tokenChecker } = require('../utils/updateToken');
const boardRouter = express.Router();
const { boardNameValidation } = require('../utils/validation');

boardRouter.get('/', tokenChecker, controllers.getBoards);
boardRouter.post('/', tokenChecker, controllers.createBoard);
boardRouter.patch('/', tokenChecker, controllers.changeBoardName);
boardRouter.patch('/column', tokenChecker, controllers.columnsBoardPosition);
boardRouter.delete('/', tokenChecker, controllers.deleteBoard);

module.exports = boardRouter;