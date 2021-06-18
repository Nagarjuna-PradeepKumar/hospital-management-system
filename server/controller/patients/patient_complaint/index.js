const record = require("../../../models/patient-record_schema");
const { checkdoctor } = require("../../../functions/User_check");
const mongoose = require("mongoose");
const validation = require("../../../validation/complaint_validation");

/**
 *  Function to create patient complaint history
 */
async function createPatientComplaintHistory(req, res) {
  const { error } = validation.create(req.body);
  if (error) return res.send(error.details[0].message);

  //----send patient_id
  try {
    var complaint_id = mongoose.Types.ObjectId();
    const addhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $push: {
          complaint_history: {
            complaint_id: complaint_id,
            doctor_name: req.body.doctor_name,
            doctor_id: req.body.doctor_id,
          },
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await addhistory) {
      return res.send({ success: complaint_id });
    } else {
      return res.send({ error: "Error adding to database" });
    }
  } catch (err) {
    return res.send({ error: error });
  }
}

/**
 *  Function to delete patient complaint history
 */
async function deletePatientComplaintHistory(req, res) {
  const { error } = validation.deletecomplaint(req.body);
  if (error) return res.send(error.details[0].message);

  //----send patient_id, complaint_id from frontend
  try {
    const delhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $pull: { complaint_history: { complaint_id: req.body.complaint_id } },
      },
      { useFindAndModify: false, new: true }
    );
    if (await delhistory) {
      return res.send({ success: "Deleted successfully" });
    } else {
      return res.send({ error: "Error deleting from database" });
    }
  } catch (err) {
    return res.send({ error: { error: err } });
  }
}

/**
 *  Function to add patient complaint history
 */
async function addPatientComplaintHistory(req, res) {
  const { error } = validation.addcomplaint(req.body);
  if (error) return res.send({ error: error.details[0].message });

  //---------patient_id, complaint_id, complaint
  try {
    const addcomplaint = await record.findOneAndUpdate(
      {
        patient_id: req.body.patient_id,
        "complaint_history.complaint_id": req.body.complaint_id,
      },
      {
        $set: {
          "complaint_history.$.complaints": req.body.complaints,
          "complaint_history.$.interpretation": req.body.interpretation,
          "complaint_history.$.medication": req.body.medication,
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await addcomplaint) {
      return res.send({ success: "added to database" });
    } else {
      return res.send({ error: addcomplaint });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}

/**
 *  Function to create patient lab test
 */
async function createPatientLabTest(req, res) {
  const { error } = validation.createlabtest(req.body);
  if (error) return res.send({ error: error.details[0].message });

  try {
    var labtest_id = mongoose.Types.ObjectId();
    const createlabtest = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $push: {
          labtest: {
            labtest_id: labtest_id,
            complaint_id: req.body.complaint_id,
          },
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await createlabtest) {
      return res.send({ success: labtest_id });
    } else {
      return res.send({ error: "Error adding to database" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}

/**
 *  Function to add patient lab test
 */
async function addPatientLabTest(req, res) {
  const { error } = validation.addlabtest(req.body);
  if (error) return res.send(error.details[0].message);
  //---------patient_id, complaint_id, complaint
  try {
    const addlabtest = await record.findOneAndUpdate(
      {
        patient_id: req.body.patient_id,
        "labtest.labtest_id": req.body.labtest_id,
      },
      {
        $set: { "labtest.$.test_suggested": req.body.test_suggested },
      },
      { useFindAndModify: false, new: true }
    );
    if (await addlabtest) {
      return res.send({ success: "Successfully added labtest" });
    } else {
      return res.send({ error: "Error adding to database" });
    }
  } catch (err) {
    return console.log({ error: err });
  }
}

/**
 *  Function to delete patient lab test
 */
async function deletePatientLabTest(req, res) {
  const { error } = validation.dellabtest(req.body);
  if (error) return res.send({ error: error.details[0].message });

  //----send patient_id, complaint_id from frontend
  try {
    const dellabtest = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $pull: { labtest: { labtest_id: req.body.labtest_id } },
      },
      { useFindAndModify: false, new: true }
    );
    if (await dellabtest) {
      return res.send({ success: "Successfully deleted labtest" });
    } else {
      return res.send({ error: "Error deleting from database" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}

/**
 *  Function to add patient lab result
 */
async function addPatientLabResult(req, res) {
  const { error } = validation.addlabresult(req.body);
  if (error) return res.send({ error: error.details[0].message });

  //---------patient_id, complaint_id, complaint
  try {
    var result_id = mongoose.Types.ObjectId();
    const addlabresult = await record.findOneAndUpdate(
      {
        patient_id: req.body.patient_id,
        "labtest.labtest_id": req.body.labtest_id,
      },
      {
        $push: {
          "labtest.$.test_result": {
            _id: result_id,
            test: req.body.test,
            comment: req.body.comment,
          },
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await addlabresult) {
      return res.send({ success: result_id });
    } else {
      return res.send({ error: "Error adding to database" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}

/**
 *  Function to delete patient lab result
 */
async function deletePatientLabResult(req, res) {
  const { error } = validation.dellabresult(req.body);
  if (error) return res.send({ error: error.details[0].message });

  //---------patient_id, complaint_id, complaint
  try {
    const dellabresult = await record.findOneAndUpdate(
      {
        patient_id: req.body.patient_id,
        "labtest.labtest_id": req.body.labtest_id,
      },
      {
        $pull: { "labtest.$.test_result": { _id: req.body.result_id } },
      },
      { useFindAndModify: false, new: true }
    );
    if (await dellabresult) {
      return res.send({ success: "Successfully deleted from database" });
    } else {
      return res.send({ error: "Error deleting from database" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}

module.exports = {
  createPatientComplaintHistory,
  deletePatientComplaintHistory,
  addPatientComplaintHistory,
  createPatientLabTest,
  addPatientLabTest,
  deletePatientLabTest,
  addPatientLabResult,
  deletePatientLabResult,
};
