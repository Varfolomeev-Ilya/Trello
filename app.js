require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(errors());

module.exports = app;
