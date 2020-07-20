const router = require("express").Router();
const patientQueController = require("../../../controller/patients/patient_que");
const { checkreception } = require("../../../functions/User_check");

/**
 * Route for Adding Patient to Que
 */
router.post("/add", checkreception, async (req, res) => {
  patientQueController.addPatientToQue(req, res);
});

/**
 * Route for Deleting Patient from Que
 */
router.post("/delete", checkreception, async (req, res) => {
  patientQueController.deletePatientFromQue(req, res);
});

/**
 * Route for Fetching All Patient from Que
 */
router.post("/get", checkreception, async (req, res) => {
  patientQueController.fetchAllQue(req, res);
});

/**
 * Route for Letting in Patient Que
 */
router.post("/letinside", checkreception, async (req, res) => {
  patientQueController.letPatientIn(req, res);
});

module.exports = router;
