const asyncHandler = require("express-async-handler");
const SemesterModel = require("../models/fileUploadModel");
const fs = require("fs");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const saveSemester = asyncHandler(async (req, res) => {
  const { name, semester } = req.body;

  const file = req.file;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const UploadParams = {
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `check/${Date.now()}`,
  };

  try {
    const data = await s3.upload(UploadParams).promise();
    const savedSemester = await SemesterModel.create({
      name,
      semester,
      url: data.Location,
      createdBy: req.user._id,
    });
    return res.status(201).json({ savedSemester });
  } catch (error) {
    console.log(error);
  }
  res.status(500).send("Unable to upload the file");
});

module.exports = {
  saveSemester,
};
