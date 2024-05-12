const multer = require("multer");

const multipleUploadSolution = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const singleUpload = multer({ storage: multipleUploadSolution ,  limits: { fileSize: 1024 * 1024 * 100 } }).single("file");

module.exports = 
{
  singleUpload,
  multerUpload: multer({
    storage: multipleUploadSolution,
    limits: { fileSize: 1024 * 1024 * 200 } 
  }),

};
