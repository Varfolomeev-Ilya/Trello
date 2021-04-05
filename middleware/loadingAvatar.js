const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'avatars');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

const uploadFile = (req, res, next) => {
  const filedata = req.file;
  console.log(filedata);
  if (!filedata) {
    return res.send(400).json({ message: 'upload error, try again' });
  } else {
    return res.send(201).json({ message: 'file is upload' })
  }
};

module.exports = { uploadFile, storageConfig, fileFilter };
