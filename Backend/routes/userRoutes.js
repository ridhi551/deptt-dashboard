const express = require("express");
const {
  registerUser,
  authUser,
  allData,
  getUpdates,
  sendUpdate,
  handleGetAllMaterialUploads,
} = require("../controllers/userController");
const { protect } = require("../middleware/authorize");

const router = express.Router();

router.route("/registerUser").post(registerUser).get(protect, allData);
router.route("/login").post(authUser);
router.route("/getUpdates").get(protect, getUpdates);
router.route("/sendUpdate").post(protect, sendUpdate);
router.route("/getAllMaterial").get(protect, handleGetAllMaterialUploads);

module.exports = router;
