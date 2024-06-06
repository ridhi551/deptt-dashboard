const asyncHandler = require("express-async-handler"); //It HANDLES all the errors automatically
const User = require("../models/userModel");
const jwttoken = require("../config/jwttoken");
const Update = require("../models/Updates");
const SemesterModel = require("../models/fileUploadModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, role, rollNumber, semester } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter the required inputs !");
  }

  const Existing = await User.findOne({ email });
  if (Existing) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const newUser = await User.create({
    name,
    email,
    password,
    pic,
    role,
    rollNumber,
    semester,
  });

  if (newUser) {
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      pic: newUser.pic,
      role: newUser.role,
      rollNumber: newUser.rollNumber,
      semester: newUser.semester, // user semester
      token: jwttoken(newUser.id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a new account");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter the required inputs !");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      role: user.role,
      rollNumber: user.rollNumber,
      semester: user.semester,
      token: jwttoken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Login account");
  }
});

const allData = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {}; //like params is for accessing the web parameters ,
  //querry is for accessing querry in the web parameters like api/user/?search = chetan

  const users = await User.find(keyword).find({ _id: { $ne: req.user.id } }); // Give all users excpet the current user
  res.send(users);
});

const sendUpdate = asyncHandler(async (req, res) => {
  const { message, reciever } = req.body;
  const newUpdate = await Update.create({
    message,
    reciever,
  });
  res.status(201).json(newUpdate);
});

const getUpdates = asyncHandler(async (req, res) => {
  const role = req.user.role;
  if (role === "admin") {
    const updates = await Update.find({}).sort({ createdAt: -1 });
    return res.send(updates);
  } else {
    const updates = await Update.find({ reciever: role }).sort({
      createdAt: -1,
    });
    return res.send(updates);
  }
});
const handleGetAllMaterialUploads = asyncHandler(async (req, res) => {
  const uploads = await SemesterModel.find({
    semester: req.user.semester,
  });
  res.send(uploads);
});
module.exports = {
  registerUser,
  authUser,
  allData,
  sendUpdate,
  getUpdates,
  handleGetAllMaterialUploads,
};
