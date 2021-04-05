const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const multer = require('multer');
const helmet = require('helmet');
const app = require('./server');
const routes = require('./routes')
const cors = require('cors');
const { storageConfig, fileFilter } = require('./middleware/loadingAvatar')
const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(helmet());
app.use(cors(corsOptions));
app.use('/account', express.static(__dirname + '/account'));
app.use(
  multer({
    storage: storageConfig,
    fileFilter: fileFilter
  }).single('filedata')
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(errors());
