const mongoose = require("mongoose");

const que_schema = new mongoose.Schema({
  time: { type: String, default: Date.now() },
  token_no: { type: Number },
  patient_id: { type: String, required: true },
  visiting_doctor: { type: String, required: true },
  patient_name: { type: String, required: true, lowercase: true },
  complaint: { type: String, lowercase: true },
  quetype: { type: String, lowercase: true, default: "waiting" },
});

module.exports = mongoose.model("waiting", que_schema);
