const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const app = express();
const userRouter = require('./routes/userRouters');
const accountRouter = require('./routes/accountRouters');

app.set("view engine", "hbs");
app.use("/upload", accountRouter, (req,res) => {
  res.render("upload.hbs");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", userRouter, accountRouter);
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use(errors());
app.listen(4000, () => console.log("Server started"));
