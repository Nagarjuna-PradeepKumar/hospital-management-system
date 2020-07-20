const router = require("express").Router();
const record = require("../../Database_schemas/patient-record_schema");
const { checkdoctor } = require("../../functions/User_check");
const { getdatas } = require("../../functions/doctor_statistics");

router.post("/getstats", checkdoctor, async (req, res) => {
  getdatas(req.body.doctor_id).then((data) => {
    return res.send({ success: data });
  });
});
module.exports = router;
