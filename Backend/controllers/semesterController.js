const asyncHandler = require("express-async-handler");
const SemesterModel = require("../models/fileUploadModel");
const fs = require('fs');

// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


const saveSemester = asyncHandler(async (req, res) => {
  const { name, semester } = req.body;

  const file = req.file; 
  console.log(file)
  const savedUid = uuidv4();
  const UploadParams = { 
    Bucket: "pdfuploadgcet",
    Key: `${savedUid}.pdf`,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
  };
  // await s3Client.send(new PutObjectCommand(UploadParams));
  const data = await s3.upload(UploadParams).promise();

  

  const savedSemester = await SemesterModel.create({
    name, 
    semester,
    url:data.Location,
    createdBy: req.user._id,
  });
 
  if (!savedSemester) {
    throw new Error
  }  


  res.status(201).json(savedSemester ,data.Location);
});

module.exports = {
  saveSemester,
};

