const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const app = express();
const loginRouters = require('./routes/routers')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", loginRouters);
app.use(function(req, res){
  res.status(404).send("Not found");
});
app.use(errors());
app.listen(4000, () => console.log("Server started"));
