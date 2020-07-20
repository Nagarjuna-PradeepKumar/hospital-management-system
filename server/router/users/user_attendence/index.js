const router = require("express").Router();
const userAttendenceController = require("../../../controller/users/user_attendence");
const { checkadmin } = require("../../../functions/User_check");

/**
 * Route to mark present for users
 */
router.post("/markpresent", async (req, res) => {
  userAttendenceController.markPresent(req, res);
});
/**
 * Route for remove present for users
 */
router.post("/removepresent", async (req, res) => {
  userAttendenceController.removePresent(req, res);
});

/**
 * Route to fetch All Attendence data of user
 */
router.post("/getdata", async (req, res) => {
  userAttendenceController.fetchAllAttendenceData(req, res);
});
/**
 *  Route to calculate Attendence for Users
 */
router.post("/calculateattendence", async (req, res) => {
  userAttendenceController.calculateAttendence(req, res);
});

module.exports = router;
