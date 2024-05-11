const asyncHandler = require("express-async-handler"); //It HANDLES all the errors automatically
const User = require("../models/userModel");
const jwttoken = require("../config/jwttoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
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
  });

  if (newUser) {
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email:newUser.email,
      password: newUser.password,
      pic: newUser.pic,
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
      password: user.password,
      email: user.email,
      pic: user.pic,
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
    : {}; //like params is for accessing the web parameters , querry is for accessing querry in the web parameters like api/user/?search = chetan

  const users = await User.find(keyword).find({ _id: { $ne: req.user.id } }); // Give all users excpet the current user
  res.send(users);
});
module.exports = { registerUser, authUser, allData };
