const express = require("express");
const { uploadCSV, getAllData } = require("../controllers/pdfExtractionController");
const { multerUpload, singleUpload } = require("../middleware/multer");

const router = express.Router();
router.route("/uploadFile").post(multerUpload.single("csv"), uploadCSV);

router.route("/getAllData").get(getAllData);

module.exports = router;
