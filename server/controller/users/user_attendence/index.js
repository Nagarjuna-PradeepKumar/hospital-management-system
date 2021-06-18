const attendence = require("../../../models/attendence_schema");
const calendar = require("../../../models/plan-calendar_schema");
const { monthattendence } = require("../../../functions/getdates");
const validation = require("../../../validation/alluservalidations");

/**
 *  Function to mark present to user
 */
async function markPresent(req, res) {
  const { error } = validation.markattendencevalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });
  try {
    const month = req.body.date.slice(0, 7);
    const mark = await attendence.findOneAndUpdate(
      { user_id: req.body.user_id, "attendence.yearmonth": await month },
      {
        $addToSet: { "attendence.$.presentdays": req.body.date },
      },
      { useFindAndModify: false, new: true }
    );
    if (await mark) {
      return res.send({ success: mark });
    } else {
      const firstdata = await attendence.findOneAndUpdate(
        { user_id: req.body.user_id },
        {
          $push: {
            attendence: { yearmonth: month, presentdays: req.body.date },
          },
        },
        { useFindAndModify: false, new: true }
      );
      if (await firstdata) {
        return res.send({ success: firstdata });
      } else {
        return res.send({ error: "Error updating to database" });
      }
    }
  } catch {
    (err) => {
      return res.send({ error: "Error finding the person" });
    };
  }
}

/**
 *  Function to remove the marked present to user
 */
async function removePresent(req, res) {
  const { error } = validation.markattendencevalidation(req.body);
  if (error) return res.send({ error: error.details[0].message });
  try {
    const month = req.body.date.slice(0, 7);
    const remove = await attendence.findOneAndUpdate(
      { user_id: req.body.user_id, "attendence.yearmonth": await month },
      {
        $pull: { "attendence.$.presentdays": req.body.date },
      },
      { useFindAndModify: false, new: true }
    );
    if (await remove) {
      return res.send({
        success: `Removed ${req.body.date} from attendence register`,
      });
    } else {
      return res.send({ error: "Error updating to database" });
    }
  } catch {
    (err) => {
      return res.send({ error: "Error finding the person" });
    };
  }
}

/**
 *  Function to fetch All Attendence data of user
 */
async function fetchAllAttendenceData(req, res) {
  const month = req.body.date.slice(0, 7);

  // send username or phonenumber from frontend
  if (req.body.user_name != undefined && req.body.phoneno != undefined) {
    const datas = await attendence.find(
      { user_name: req.body.user_name, phoneno: req.body.phoneno },
      {
        _id: 0,
        user_id: 1,
        user_name: 1,
        user_role: 1,
        phoneno: 1,
        attendence: {
          $elemMatch: { yearmonth: await month, presentdays: req.body.date },
        },
      }
    );
    if (datas.length > 0) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No data found" });
    }
  }
  if (req.body.user_name != undefined && req.body.phoneno === undefined) {
    const datas = await attendence.find(
      { user_name: req.body.user_name },
      {
        _id: 0,
        user_id: 1,
        user_name: 1,
        user_role: 1,
        phoneno: 1,
        attendence: {
          $elemMatch: { yearmonth: await month, presentdays: req.body.date },
        },
      }
    );
    if (datas.length > 0) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No data found" });
    }
  }
  if (req.body.user_name === undefined && req.body.phoneno !== undefined) {
    const datas = await attendence.find(
      { phoneno: req.body.phoneno },
      {
        _id: 0,
        user_id: 1,
        user_name: 1,
        user_role: 1,
        phoneno: 1,
        attendence: {
          $elemMatch: { yearmonth: await month, presentdays: req.body.date },
        },
      }
    );
    if (datas.length > 0) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No data found" });
    }
  } else {
    const datas = await attendence.find(
      {},
      {
        _id: 0,
        user_id: 1,
        user_name: 1,
        user_role: 1,
        phoneno: 1,
        attendence: {
          $elemMatch: { yearmonth: await month, presentdays: req.body.date },
        },
      }
    );
    if (datas.length > 0) {
      return res.send({ success: datas });
    } else {
      return res.send({ error: "No data found" });
    }
  }
}

/**
 *  Function to calculate Attendence for Users
 */
async function calculateAttendence(req, res) {
  const isplanned = await calendar.findOne({ yearmonth: req.body.month });
  if (isplanned) {
    const datas = await attendence.findOne(
      { user_id: req.body.user_id },
      { _id: 0, attendence: { $elemMatch: { yearmonth: req.body.month } } }
    );
    if (datas.attendence.length > 0) {
      return res.send({
        success: await monthattendence(
          isplanned.workingdays,
          datas.attendence[0].presentdays
        ),
        workingdays: await isplanned.workingdays.filter(
          (x) => new Date(x) < new Date() - 8.64e7
        ),
      });
    } else {
      return res.send({ error: "No data found" });
    }
  } else {
    return res.send({ error: "No plan has been done for this month" });
  }
}

module.exports = {
  markPresent,
  removePresent,
  fetchAllAttendenceData,
  calculateAttendence,
};
