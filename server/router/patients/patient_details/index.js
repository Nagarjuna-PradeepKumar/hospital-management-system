const router = require("express").Router();
const patientController = require("../../../controller/patients/patient_details");
const { checkreception } = require("../../../functions/User_check");

/**
 * Route for Creating Patient
 */
router.post("/create", checkreception, async (req, res) => {
  patientController.createPatient(req, res);
});

/**
 * Route for Fetching Patient Data
 */
router.post("/getdata", checkreception, async (req, res) => {
  patientController.fetchPatientData(req, res);
});

/**
 * Route for Changing Patient Data
 */
router.post("/changedata", checkreception, async (req, res) => {
  patientController.changePatientData(req, res);
});

/**
 * Route for Fetching Patient Data by Id
 */
router.post("/getbyid", checkreception, async (req, res) => {
  patientController.fetchPatientDatabyId(req, res);
});

module.exports = router;
