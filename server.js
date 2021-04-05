const express = require('express');
const config = require('./config');

const app = express();

app.listen(8080, () => console.log('Server started'));

module.exports = app;