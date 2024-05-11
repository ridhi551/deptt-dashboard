const mongoose = require('mongoose')
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log(`Mongo Database Connected 😗💕💕💕💕`);
    } catch (error) {
      console.log(`'😒 MongoDB Error message': ${error.message}`);
      process.exit();
    } 
  }; 
  
  module.exports = connectDB;

 