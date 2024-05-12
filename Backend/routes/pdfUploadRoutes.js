const express = require("express");
const { uploadCSV } = require("../controllers/pdfExtractionController");
const { multerUpload, singleUpload } = require("../middleware/multer");

const router = express.Router();
router.route("/uploadFile").post(multerUpload.single("csv"), uploadCSV);

module.exports = router;
