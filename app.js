const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const app = express();
const userRouter = require('./routes/userRouters');
const accountRouter = require('./routes/accountRouters');
const boardRouter = require('./routes/boardsRouters')
const multer = require('multer');
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
// app.use("/account", (req,res) => {
//   res.send(req.file)
// });
const upload = multer({dest:"avatars"});
// app.use(express.static(__dirname));
// app.post("/account", upload.single("filedata"),
//  function (req, res, next) {
   
//   let filedata = req.file;

//   console.log(filedata);
//   if(!filedata)
//       res.send("Ошибка при загрузке файла");
//   else
//       res.send("Файл загружен");
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( "/", userRouter, accountRouter, boardRouter );
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use(errors());
app.listen(8080, () => console.log("Server started"));
