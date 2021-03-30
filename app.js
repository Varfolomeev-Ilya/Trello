const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const app = express();
const userRouter = require('./routes/userRouters');
const accountRouter = require('./routes/accountRouters');
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
// app.set("view engine", "hbs");
// app.use("/account", userRouter, (req,res) => {
//   res.send(req.file)
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", userRouter, accountRouter);
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use(errors());
app.listen(8080, () => console.log("Server started"));
