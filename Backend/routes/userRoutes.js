const express = require("express");
const {
  registerUser,
  authUser,
  allData,
  getUpdates,
  sendUpdate,
  handleGetAllMaterialUploads,
  handleGetAllRecords,
} = require("../controllers/userController");
const { protect } = require("../middleware/authorize");

const router = express.Router();

router.route("/registerUser").post(registerUser).get(protect, allData); // TEacher   --> all data of student
router.route("/login").post(authUser);
router.route("/getUpdates").get(protect, getUpdates);
router.route("/sendUpdate").post(protect, sendUpdate);
router.route("/getAllMaterial").get(protect, handleGetAllMaterialUploads);
router.route("/getAllRecords").get(protect, handleGetAllRecords);

module.exports = router;
