const mongoose = require("mongoose");
const record = require("../../../models/patient-record_schema");

const validation = require("../../../validation/patient_create_edit_validation");

/**
 *  Function to add Family history
 */
async function addFamilyHistory(req, res) {
  try {
    var commentid = mongoose.Types.ObjectId();
    const addhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $push: {
          family_history: {
            _id: commentid,
            subject: req.body.subject,
            comment: req.body.comment,
          },
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await addhistory) {
      return res.send({ success: commentid });
    } else {
      return res.send({ error: "Error saving to database" });
    }
  } catch (err) {
    return res.send("error");
  }
}

/**
 *  Function to Edit Family history
 */
async function editFamilyHistory(req, res) {
  const { error } = validation.deleditpatienthistoryvalidation(req.body);
  if (error) return res.send(error.details[0].message);

  //send patient_id and subject,comment array from front end,
  try {
    const edithistory = await record.findOneAndUpdate(
      {
        patient_id: req.body.patient_id,
        "family_history._id": req.body.comment_id,
      },
      {
        $set: {
          "family_history.$.subject": req.body.subject,
          "family_history.$.comment": req.body.comment,
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await edithistory) {
      return res.send("Edited family history");
    } else {
      return res.send("error");
    }
  } catch (err) {
    return res.send("error");
  }
}

/**
 *  Function to Delete Family history
 */
async function deleteFamilyHistory(req, res) {
  const { error } = validation.deleditpatienthistoryvalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });

  //send patient_id and subject,comment array from front end,
  try {
    const delhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $pull: { family_history: { _id: req.body.comment_id } },
      },
      { useFindAndModify: false, new: true }
    );
    if (await delhistory) {
      return res.send({ success: "deleted family history" });
    } else {
      return res.send({ error: "Error deleting from database" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}

/**
 *  Function to add Personal history
 */
async function addPersonalHistory() {
  try {
    var commentid = mongoose.Types.ObjectId();
    const addhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $push: {
          personal_history: {
            _id: commentid,
            subject: req.body.subject,
            comment: req.body.comment,
          },
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await addhistory) {
      return res.send({ success: commentid });
    } else {
      return res.send({ error: "Error saving to database" });
    }
  } catch (err) {
    return res.send("error");
  }
}

/**
 *  Function to Edit Personal history
 */
async function editPersonalHistory(req, res) {
  const { error } = validation.deleditpatienthistoryvalidation(req.body);
  if (error) return res.send(error.details[0].message);

  //send patient_id and subject,comment array from front end,
  try {
    const edithistory = await record.findOneAndUpdate(
      {
        patient_id: req.body.patient_id,
        "personal_history._id": req.body.comment_id,
      },
      {
        $set: {
          "personal_history.$.subject": req.body.subject,
          "personal_history.$.comment": req.body.comment,
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await edithistory) {
      return res.send("Edited personal history");
    } else {
      return res.send("error");
    }
  } catch (err) {
    return res.send("error");
  }
}

/**
 *  Function to Delete Personal history
 */
async function deletePersonalHistory(req, res) {
  const { error } = validation.deleditpatienthistoryvalidation(req.body);
  if (error) return res.send(error.details[0].message);

  //send patient_id and subject,comment array from front end,
  try {
    const delhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $pull: { personal_history: { _id: req.body.comment_id } },
      },
      { useFindAndModify: false, new: true }
    );
    if (await delhistory) {
      return res.send({ success: "deleted personal history" });
    } else {
      return res.send({ error: "Error deleting from database" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}
/**
 *  Function to add Past history
 */
async function addPastHistory(req, res) {
  try {
    var commentid = mongoose.Types.ObjectId();
    const addhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $push: {
          past_history: {
            _id: commentid,
            subject: req.body.subject,
            comment: req.body.comment,
          },
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await addhistory) {
      return res.send({ success: commentid });
    } else {
      return res.send({ error: "Error saving to database" });
    }
  } catch (err) {
    return res.send("error");
  }
}

/**
 *  Function to Edit Past history
 */
async function editPastHistory(req, res) {
  const { error } = validation.deleditpatienthistoryvalidation(req.body);
  if (error) return res.send(error.details[0].message);

  //send patient_id and subject,comment array from front end,
  try {
    const edithistory = await record.findOneAndUpdate(
      {
        patient_id: req.body.patient_id,
        "past_history._id": req.body.comment_id,
      },
      {
        $set: {
          "past_history.$.subject": req.body.subject,
          "past_history.$.comment": req.body.comment,
        },
      },
      { useFindAndModify: false, new: true }
    );
    if (await edithistory) {
      return res.send("Edited past history");
    } else {
      return res.send("error");
    }
  } catch (err) {
    return res.send("error");
  }
}

/**
 *  Function to Delete Past history
 */
async function deletePastHistory(req, res) {
  const { error } = validation.deleditpatienthistoryvalidation(req.body);
  if (error) return res.send(error.details[0].message);

  //send patient_id and subject,comment array from front end,
  try {
    const delhistory = await record.findOneAndUpdate(
      { patient_id: req.body.patient_id },
      {
        $pull: { past_history: { _id: req.body.comment_id } },
      },
      { useFindAndModify: false, new: true }
    );
    if (await delhistory) {
      return res.send({ success: "deleted past history" });
    } else {
      return res.send({ error: "Error deleting from database" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
}

/**
 *  Function to fetch patient record
 */
async function fetchPatientRecord(req, res) {
  const data = await record.findOne({ patient_id: req.body.patient_id });
  if (data) {
    return res.send({ success: data });
  } else {
    return res.send({ error: "No patient data found" });
  }
}

module.exports = {
  addFamilyHistory,
  addPersonalHistory,
  addPastHistory,
  editFamilyHistory,
  editPersonalHistory,
  editPastHistory,
  deleteFamilyHistory,
  deletePersonalHistory,
  deletePastHistory,
  fetchPatientRecord,
};
