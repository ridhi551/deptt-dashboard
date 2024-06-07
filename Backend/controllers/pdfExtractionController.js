const csvParser = require("csv-parser");
const fs = require("fs");
const ExtractedUserData = require("../models/extractedUserData");

const uploadCSV = async (req, res, next) => {
  
  try {
    const csvData = await new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(req.file?.path)
        .pipe(csvParser())
        .on("data", (data) => {
          console.log(data);

          const lowercaseData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key.toLowerCase(),
              value,
            ])
          );
          results.push(lowercaseData);
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
    if (!csvData || csvData.length === 0) {
      const error = new Error("CSV data not found");
      error.status = 404;
      throw error;
    }

    const users = csvData.map((row) => ({
      name: row.name,
      email: row.email,
      rollNumber: row.rollno,
      semester: row.semester,
      parentage: row.parentage,
      gender: row.gender,
      mob: row.mob,
    }));


    for (const user of users) {
      const newUser = new ExtractedUserData(user);
      try {
        await newUser.save();
      } catch (error) {
        console.error("Error saving user data:", error);
        throw new Error("Error saving user data ,CSV data not found", error);
      }
    }

    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error removing uploaded file:", err);
      } else {
        console.log("Uploaded file removed successfully");
      }
    });
  }
};

//get all data from extractesd users model
const getAllData = async (req, res, next) => {
  try {
    const data = await ExtractedUserData.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { uploadCSV, getAllData };
