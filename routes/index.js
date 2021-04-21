const router = require('express').Router();
const userRouter = require('./userRouters');
const accountRouter = require('./accountRouters');
const boardRouter = require('./boardsRouters');
const columnsRouter = require('./columnsRouter');
const taskRouter = require('./tasksRouters');
const adminRouter = require('./adminRouters')

router.use('/', accountRouter);
router.use('/user', userRouter);
router.use('/boards', boardRouter);
router.use('/columns', columnsRouter);
router.use('/tasks', taskRouter);
router.use('/admin', adminRouter);
router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
