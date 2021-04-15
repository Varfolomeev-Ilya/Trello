const express = require('express');
const controllers = require('../controllers/columnsController');
const { tokenChecker } = require('../middleware/updateToken');
const columnsRouter = express.Router();

columnsRouter.get('/column', controllers.getColumns);
columnsRouter.post('/column' , controllers.createColumn);
columnsRouter.patch('/column' , controllers.changeColumnName);
columnsRouter.delete('/column', controllers.deleteColumn);

module.exports = columnsRouter;