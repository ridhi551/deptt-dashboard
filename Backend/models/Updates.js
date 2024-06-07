const mongoose = require("mongoose");

const UpdateSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    reciever: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Update = mongoose.model("Update", UpdateSchema);
module.exports = Update;
