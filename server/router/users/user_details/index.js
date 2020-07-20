const router = require("express").Router();
const { checkadmin } = require("../../../functions/User_check");
const userController = require("../../../controller/users/user_details");

/**
 * Route for Creating User
 */
router.post("/create", async (req, res) => {
  userController.createUser(req, res);
});
/**
 * Route for Logging In User
 */
router.post("/login", async (req, res) => {
  userController.userLogin(req, res);
});
/**
 * Route for Verify User Data
 */
router.post("/verify", async (req, res) => {
  userController.verifyUserDetails(req, res);
});
/**
 * Route for Fetching User Data
 */
router.post("/getdata", checkadmin, async (req, res) => {
  userController.getUserData(req, res);
});
/**
 * Route for Fetching Doctor List
 */
router.post("/getdoctor", async (req, res) => {
  userController.getDoctorList(req, res);
});
/**
 * Route for Changing User Data
 */
router.post("/changedata", checkadmin, async (req, res) => {
  userController.changeUserData(req, res);
});
/**
 * Route for Changing User Password
 */
router.post("/changepassword", checkadmin, async (req, res) => {
  userController.changeUserPassword(req, res);
});
/**
 * Route for Deleting User
 */
router.post("/delete", checkadmin, async (req, res) => {
  userController.deleteUser(req, res);
});
module.exports = router;
