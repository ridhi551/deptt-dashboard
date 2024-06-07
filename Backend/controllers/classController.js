const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Course = require("../models/courseModel");

const createClass = asyncHandler(async (req, res) => {
    const { className, description, adminId , pic} = req.body;
  
    const newClass = await Course.create({
      className: className,
      description: description,
      admin: adminId,
      pic : pic,
      joinedMembers: [adminId], 
  
    });
  
    const data = await User.findById(adminId)
    data.joinedClasses.push(newClass._id)
    await data.save()
  
    
    res.status(201).json(newClass);
  });
  
  