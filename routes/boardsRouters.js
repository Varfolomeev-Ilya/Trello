const express = require('express');
const controllers = require('../controllers/boardsController');
const { tokenChecker } = require('../utils/updateToken');
const { boardNameValidation } = require('../utils/validation');
const boardRouter = express.Router();

boardRouter.get('/', tokenChecker, controllers.getBoards);
boardRouter.post('/', tokenChecker, boardNameValidation, controllers.createBoard);
boardRouter.patch('/', tokenChecker, boardNameValidation, controllers.changeBoardName);
boardRouter.patch('/column', tokenChecker, controllers.columnsBoardPosition);
boardRouter.delete('/', tokenChecker, controllers.deleteBoard);

module.exports = boardRouter;