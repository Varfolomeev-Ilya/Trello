const jwt = require("jsonwebtoken");
const models = require("../db/models");
const multer = require('multer');

const uploadFile = (req, res, next) => {
  try {
    const filedata = req.file;
      if(!filedata){
      return res.send(401).json({ message: "upload error, try again"});
      }
      console.log(filedata);
  } catch (err) {
    res.status(401).json({ message : err.message});
  }   
}

module.exports = { uploadFile };

