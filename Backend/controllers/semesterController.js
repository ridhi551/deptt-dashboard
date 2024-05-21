const asyncHandler = require("express-async-handler");
const SemesterModel = require("../models/fileUploadModel");
const fs = require('fs');

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { v4: uuidv4 } = require('uuid');



const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const saveSemester = asyncHandler(async (req, res) => {
  const { name, semester } = req.body;

  const file = req.file; 

  const savedUid = uuidv4();
  const UploadParams = { 
    Bucket: "skitii-badgeimages",
    Key: `check/${savedUid}.pdf`,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
  };


  try {
    
    await s3Client.send(new PutObjectCommand(UploadParams));
  } catch (error) {
    console.log(error)
  }


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

