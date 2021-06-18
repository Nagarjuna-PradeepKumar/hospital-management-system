const router = require("express").Router();
const { checkdoctor } = require("../../../functions/User_check");
const doctorStatisticsController = require("../../../controller/doctor/doctor_statistics");

/**
 * Route to get statistics of Doctor
 */
router.post("/getstats", checkdoctor, async (req, res) => {
  doctorStatisticsController.getDoctorStatistics(req, res);
});

module.exports = router;
