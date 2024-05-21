const mongoose = require("mongoose");


const extractedUserData = mongoose.Schema(
  {
   name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        
      },
      rollNumber: {
        type: String,
        required: true,
      },
      semester: { 
        type: String, 
        required: true,
        
      },
      parentage: { 
        type: String, 
        required: true,
        
      },
      gender: { 
        type: String, 
        required: true,
        
      },
      mob: { 
        type: String, 
        required: true,
    },
    
},
    {
      timestamps: true,
    }
);

const ExtractedUserData = mongoose.model("PDFextractedUserData",extractedUserData)


module.exports = ExtractedUserData 