const express = require("express");
const {
  registerUser,
  authUser,
  allData,
} = require("../controllers/userController");
const { protect } = require("../middleware/authorize");

const router = express.Router();

router.route("/registerUser").post(registerUser).get(protect, allData);  // TEacher   --> all data of student 
router.route("/login").post(authUser);


module.exports = router;
