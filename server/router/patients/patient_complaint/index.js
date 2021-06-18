const router = require("express").Router();
const patientComplaintController = require("../../../controller/patients/patient_complaint");
const { checkdoctor } = require("../../../functions/User_check");

/**
 * Route for creating patient complaint history
 */
router.post("/create", checkdoctor, async (req, res) => {
  patientComplaintController.createPatientComplaintHistory(req, res);
});

/**
 * Route for deleting patient complaint history
 */
router.post("/delete", checkdoctor, async (req, res) => {
  patientComplaintController.deletePatientComplaintHistory(req, res);
});

/**
 * Route for adding patient complaint history
 */
router.post("/addcomplaint", checkdoctor, async (req, res) => {
  patientComplaintController.addPatientComplaintHistory(req, res);
});

/**
 * Route for creating patient lab record
 */
router.post("/createlabtest", checkdoctor, async (req, res) => {
  patientComplaintController.createPatientLabTest(req, res);
});

/**
 * Route for deleting patient lab test record
 */
router.post("/dellabtest", checkdoctor, async (req, res) => {
  patientComplaintController.deletePatientLabTest(req, res);
});

/**
 * Route for adding patient lab test record
 */
router.post("/addlabtest", checkdoctor, async (req, res) => {
  patientComplaintController.addPatientLabTest(req, res);
});

/**
 * Route for adding patient lab test result
 */
router.post("/addlabresult", checkdoctor, async (req, res) => {
  patientComplaintController.addPatientLabResult(req, res);
});
/**
 * Route for deleting patient lab test result
 */
router.post("/dellabresult", checkdoctor, async (req, res) => {
  patientComplaintController.deletePatientLabResult(req, res);
});

module.exports = router;
