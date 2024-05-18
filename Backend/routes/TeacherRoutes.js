const express = require("express");

const { multerUpload, singleUpload } = require("../middleware/multer");
const { saveSemester } = require("../controllers/semesterController");

const router = express.Router();
router
  .route("/uploadAssignment")
  .post(multerUpload.single("file"), saveSemester);

module.exports = router;
