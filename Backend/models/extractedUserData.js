const mongoose = require("mongoose");


const extractedUserData = mongoose.Schema(
  {
   name: {
        type: String,

      },
      email: {
        type: String,
 
        
      },
      rollNumber: {
        type: String,
  
      },
      semester: { 
        type: String, 
 
        
      },
      parentage: { 
        type: String, 

        
      },
      gender: { 
        type: String, 
    
        
      },
      mob: { 
        type: String, 

    },
    
},
    {
      timestamps: true,
    }
);

const ExtractedUserData = mongoose.model("PDFextractedUserData",extractedUserData)


module.exports = ExtractedUserData 