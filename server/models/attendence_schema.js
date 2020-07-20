const mongoose = require("mongoose");
const attendence = new mongoose.Schema({
  user_id: { type: String, required: true},
  user_name: { type: String, required: true, lowercase: true },
  user_role: { type: String, required: true, lowercase: true },
  phoneno: { type: String, required: true },
  attendence: [
    {
      _id: false,
      yearmonth: { type: String},
      presentdays: [{ type: String }],
    },
  ],
});

module.exports = mongoose.model("attendence", attendence);
