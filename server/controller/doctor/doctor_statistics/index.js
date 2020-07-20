const { checkdoctor } = require("../../../functions/User_check");
const { getdatas } = require("../../../functions/doctor_statistics");

/**
 * Function to get doctor statistics
 */
async function getDoctorStatistics(req, res) {
  getdatas(req.body.doctor_id).then((data) => {
    return res.send({ success: data });
  });
}

module.exports = {
  getDoctorStatistics,
};
