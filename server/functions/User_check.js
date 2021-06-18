const user = require("../models/Users_schema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function checkadmin(req, res, next) {
  const admin = ["admin", "doctor"];
  try {
    const token = await req.get("Authorization").replace("Bearer ", "");
    const payload = jwt.verify(await token, process.env.jwt_master_secret);
    /*------------redirect to error page--------------------- */
    try {
      const userdata = await user.findOne({
        _id: await payload.id,
        role: await payload.role,
        status: true,
      });
      if (admin.findIndex((x) => x === userdata.user_role) === -1)
        return res.send({ error: "g" });
    } catch (err) {
      return /*redirect to error page*/ res.send({ error: "d" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
  /*------------redirect to error page--------------------- */
  next();
}

async function checkreception(req, res, next) {
  const admin = ["admin", "doctor", "reception"];
  try {
    const token = await req.get("Authorization").replace("Bearer ", "");
    const payload = jwt.verify(await token, process.env.jwt_master_secret);
    /*------------redirect to error page--------------------- */
    try {
      const userdata = await user.findOne({
        _id: await payload.id,
        role: await payload.role,
        status: true,
      });
      if (admin.findIndex((x) => x === userdata.user_role) === -1)
        return res.send({ error: "g" });
    } catch (err) {
      return /*redirect to error page*/ res.send({ error: "d" });
    }
  } catch (err) {
    return res.send({ error: "f" });
  }
  /*------------redirect to error page--------------------- */
  next();
}
async function checkdoctor(req, res, next) {
  const admin = ["doctor"];
  try {
    const token = await req.get("Authorization").replace("Bearer ", "");
    const payload = jwt.verify(await token, process.env.jwt_master_secret);
    /*------------redirect to error page--------------------- */
    try {
      const userdata = await user.findOne({
        _id: await payload.id,
        role: await payload.role,
        status: true,
      });
      if (admin.findIndex((x) => x === userdata.user_role) === -1)
        return res.send({ error: "g" });
    } catch (err) {
      return /*redirect to error page*/ res.send({ error: "d" });
    }
  } catch (err) {
    return res.send({ error: "f" });
  }
  /*------------redirect to error page--------------------- */
  next();
}

module.exports = { checkadmin, checkreception, checkdoctor };
