const que = require("../models/patient_que_schema");

async function tokennogetter() {
  const maxtoken = await que.find({}).sort({ token_no: -1 }).limit(1);
  if (maxtoken.length > 0) {
    return parseInt(maxtoken[0].token_no) + parseInt(1);
  } else {
    return parseInt(1);
  }
  // if(maxtoken.length>=0){console.log(parseInt(maxtoken.token_no)+parseInt(1))}else{console.log(parseInt(1))}
}

module.exports = { tokennogetter };
