const express = require("express");

const { multerUpload, singleUpload } = require("../middleware/multer");
const { saveSemester } = require("../controllers/semesterController");
const { protect } = require("../middleware/authorize");

const router = express.Router();
router
  .route("/uploadAssignment")
  .post(multerUpload.single("file"), protect, saveSemester);
router
  .route("/uploadRecord")
  .post(multerUpload.single("file"), protect, saveSemester);

module.exports = router;
