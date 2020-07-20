const user = require("../../../models/Users_schema");
const attendence = require("../../../models/attendence_schema");
const validation = require("../../../validation/alluservalidations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**
 *  Function to create user
 */
async function createUser(req, res) {
  const { error } = validation.createuservalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });

  if (req.body.user_role === "admin") {
    const checkadmin = await user.find({ user_role: "admin", status: true });
    if ((await checkadmin.length) >= 2) {
      return res.send({ error: "Cannot create more than 2 administrators" });
    }
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  const newuser = new user({
    user_name: req.body.user_name,
    user_role: req.body.user_role,
    phoneno: req.body.phoneno,
    email: req.body.email,
    address: req.body.address,
    password: hashedpassword,
  });

  const isuser = await user.findOne({
    phoneno: req.body.phoneno,
    user_name: req.body.user_name,
    status: true,
  });
  if (isuser) {
    return res.send({ error: "This user is already saved" });
  }
  if (!isuser) {
    const savednewuser = await newuser.save();
    if (savednewuser) {
      const isattendence = await new attendence({
        user_id: await savednewuser._id,
        user_name: req.body.user_name,
        user_role: req.body.user_role,
        phoneno: req.body.phoneno,
      }).save();
      if (isattendence) {
        return res.send({ success: await savednewuser.user_role });
      }
    } else {
      return res.send({ error: "Error saving to database" });
    }
  }
}

/**
 * Function to Login User
 */
async function userLogin(req, res) {
  const { error } = validation.userloginvalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });

  const usernameexist = await user.findOne({
    user_name: req.body.user_name,
    phoneno: req.body.phoneno,
    status: true,
  });
  if (!usernameexist) return res.send({ error: "This user does not exist" });

  async function checkpassword() {
    dbpassword = await usernameexist.password;
    const validpassword = bcrypt.compareSync(
      req.body.password,
      await dbpassword
    );
    if (!validpassword) return false;
    return true;
  }

  if (usernameexist && (await checkpassword())) {
    token = jwt.sign(
      { id: usernameexist._id, role: usernameexist.role },
      process.env.jwt_master_secret
    );
    res.send({
      success: await token,
      role: usernameexist.user_role,
      name: usernameexist.user_name,
    });
  } else return res.send({ error: "Wrong password" });
}

/**
 * Function to Verify Details
 */
async function verifyUserDetails(req, res) {
  try {
    const token = await req.body.token;
    const payload = jwt.verify(await token, process.env.jwt_master_secret);
    try {
      const userdata = await user.findOne({
        _id: await payload.id,
        role: await payload.role,
        status: true,
      });
      if (userdata)
        return res.send({
          success: "Found user",
          name: userdata.user_name,
          role: userdata.user_role,
          id: userdata._id,
        });
    } catch (err) {
      return res.send({ error: "Could not find any user" });
    }
  } catch (err) {
    return res.send({ error: "Session expired, Login again to continue" });
  }
}

/**
 * Function to Get User data
 */
async function getUserData(req, res) {
  const { error } = validation.usergetdatavalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });

  // send username or phonenumber from frontend
  if (req.body.user_name != undefined && req.body.phoneno != undefined) {
    const datas = await user.find({
      user_name: req.body.user_name,
      phoneno: req.body.phoneno,
      status: true,
    });
    if (datas) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No such user found" });
    }
  }
  if (req.body.user_name != undefined && req.body.phoneno === undefined) {
    const datas = await user.find({
      user_name: req.body.user_name,
      status: true,
    });
    if (datas) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No such user found" });
    }
  }
  if (req.body.user_name === undefined && req.body.phoneno !== undefined) {
    const datas = await user.find({ phoneno: req.body.phoneno, status: true });
    if (datas) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No such user found" });
    }
  } else {
    const datas = await user.find({ status: true });
    if (datas) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No such user found" });
    }
  }
}

/**
 * Function to get list of doctors
 */
async function getDoctorList(req, res) {
  try {
    const list = [];
    const datas = await user.find(
      { status: true, user_role: "doctor" },
      { user_name: 1, _id: 0 }
    );
    if (datas.length > 0) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No doctors found" });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
}

/**
 * Function to change User data
 */
async function changeUserData(req, res) {
  //sending user_id from frontend is must

  const { error } = validation.changeuservalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });

  const finduser = await user.findOne({ _id: req.body.user_id });
  if (finduser.user_role === "admin" && req.body.user_role != "admin") {
    const checkadmin = await user.find({ user_role: "admin", status: true });
    if (checkadmin.length >= 2) {
      return res.send({ error: "Cannot create more than 2 administrators" });
    } else if (checkadmin.length === 1) {
      return res.send({ error: "Atleast one administrator is required" });
    }
  } else {
    const usernameexist = await user.findOne({
      _id: { $ne: req.body.user_id },
      user_name: req.body.user_name,
      phoneno: req.body.phoneno,
      status: true,
    });
    if (!usernameexist) {
      try {
        const newdata = await user.findOneAndUpdate(
          { _id: req.body.user_id, status: true },
          {
            user_name: req.body.user_name,
            user_role: req.body.user_role,
            phoneno: req.body.phoneno,
            email: req.body.email,
            address: req.body.address,
          },
          { useFindAndModify: false, new: true }
        );
        const modattendence = await attendence.findOneAndUpdate(
          { user_id: req.body.user_id },
          {
            user_name: req.body.user_name,
            user_role: req.body.user_role,
            phoneno: req.body.phoneno,
          },
          { useFindAndModify: false, new: true }
        );
        if ((await newdata) && (await modattendence)) {
          return res.send({
            success: "updated successfully",
            newdata: newdata,
          });
        } else {
          /* redirect to error page */ return res.send({
            error: "Error saving to database",
          });
        }
      } catch {
        (err) => {
          return res.send({ error: "No such user found" });
        };
      }
    } else {
      return res.send({ error: "Another user with same details found" });
    }
  }
}

/**
 * Function to change User Password
 */
async function changeUserPassword(req, res) {
  const { error } = validation.changeuserpasswordvalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });

  //sending user_id and password from frontend is must
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newdata = await user.findOneAndUpdate(
      { _id: req.body.user_id, status: true },
      {
        password: hashedpassword,
      },
      { useFindAndModify: false, new: true }
    );
    if (await newdata) {
      return res.send({ success: "Changed password" });
    } else {
      /* redirect to error page */ return res.send({
        error: "Error saving to database",
      });
    }
  } catch {
    (err) => {
      return res.send({ error: "No such user found" });
    };
  }
}

/**
 * Delete a User
 */
async function deleteUser(req, res) {
  const { error } = validation.deleteuservalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });

  const finduser = await user.findOne({ _id: req.body.user_id });
  if (finduser.user_role === "admin") {
    const checkadmin = await user.find({ user_role: "admin", status: true });
    if (checkadmin.length === 1) {
      return res.send({ error: "Atleast one administrator is required" });
    } else {
      try {
        const deleteuser = await user.findOneAndUpdate(
          { _id: req.body.user_id, status: true },
          {
            status: false,
          },
          { useFindAndModify: false, new: true }
        );
        if (await deleteuser) {
          return res.send({ success: "Deleted user" });
        } else {
          /* redirect to error page */ return res.send({
            error: "Error deleting user from database",
          });
        }
      } catch {
        (err) => {
          return res.send({ error: "No such user found" });
        };
      }
    }
  } else {
    try {
      const deleteuser = await user.findOneAndUpdate(
        { _id: req.body.user_id, status: true },
        {
          status: false,
        },
        { useFindAndModify: false, new: true }
      );
      if (await deleteuser) {
        return res.send({ success: "Deleted user" });
      } else {
        /* redirect to error page */ return res.send({
          error: "Error deleting user from database",
        });
      }
    } catch {
      (err) => {
        return res.send({ error: "No such user found" });
      };
    }
  }
}

module.exports = {
  createUser,
  userLogin,
  verifyUserDetails,
  getUserData,
  getDoctorList,
  changeUserData,
  changeUserPassword,
  deleteUser,
};
