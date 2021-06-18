const validation = require("../../../validation/quevalidation");
const que = require("../../../models/patient_que_schema");
const { tokennogetter } = require("../../../functions/tokenno_getter");

/**
 *  Function to add to patient que
 */
async function addPatientToQue(req, res) {
  const { error } = validation.queadd(req.body);
  if (error) return res.send({ error: error.details[0].message });

  const newque = new que({
    patient_id: req.body.patient_id,
    token_no: await tokennogetter(),
    visiting_doctor: req.body.visiting_doctor,
    patient_name: req.body.patient_name,
    complaint: req.body.complaint,
  });
  const ispresent = await que.findOne({ patient_id: req.body.patient_id });
  if (ispresent) {
    return res.send({ error: "Patient has already been given a token" });
  }
  if (!ispresent) {
    const savedtoque = await newque.save();
    if (savedtoque) {
      return res.send({
        success: `The patient's token number is ${savedtoque.token_no}`,
      });
    } else {
      /* redirect to error*/ return res.send({
        error: "Error saving to database",
      });
    }
  }
}

/**
 *  Function to delete patient from que
 */
async function deletePatientFromQue(req, res) {
  const deleteuser = await que.findOneAndRemove(
    { patient_id: req.body.patient_id },
    { useFindAndModify: false }
  );
  if (deleteuser) {
    return res.send({ success: "Removed patient from que" });
  } else {
    return res.send({ error: "Error removing patient from que" });
  }
}

/**
 *  Function to Fetch patient from que
 */
async function fetchAllQue(req, res) {
  const getque = await que.find({});
  if (getque) {
    return res.send({ success: getque });
  } else {
    return res.send({ error: "No patients in que" });
  }
}

/**
 *  Function to let patient inside
 */
async function letPatientIn(req, res) {
  const letinside = await que.findOneAndUpdate(
    { patient_id: req.body.patient_id },
    { quetype: "attending" },
    { useFindAndModify: false }
  );
  if (letinside) {
    return res.send({ success: "Done" });
  } else {
    return res.send({ error: "Error updating database" });
  }
}

module.exports = {
  addPatientToQue,
  deletePatientFromQue,
  fetchAllQue,
  letPatientIn,
};
