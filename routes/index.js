const router = require('express').Router();
const userRouter = require('./userRouters');
const accountRouter = require('./accountRouters');
const boardRouter = require('./boardsRouters');

router.use('/', userRouter, accountRouter, boardRouter);
router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;