const mongoose = require("mongoose");

const fileUploadModel = mongoose.Schema({
  name: {
    type: String,
  },
  semester: {
    type: Number,
  },
  url: {   //file     
    type: String,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
const SemesterModel = mongoose.model("SemesterModel", fileUploadModel);
module.exports = SemesterModel;
