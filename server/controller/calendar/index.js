const calendar = require("../../models/plan-calendar_schema");
const { getdates } = require("../../functions/getdates");

/**
 *  Function to fetch all Canlendar Data
 */
async function fetchAllCalendarData(req, res) {
  const data = await calendar.find(
    {},
    { _id: 0, workingdays: 0, holidays: 0, __v: 0 }
  );
  if (data) {
    return res.send({ success: data });
  } else {
    return res.send({ error: "No plan found for that month" });
  }
}

/**
 *  Function to fetch month Data
 */
async function fetchCalendatMonthData(req, res) {
  const data = await calendar.findOne(
    { yearmonth: req.body.yearmonth },
    { _id: 0 }
  );
  if (data) {
    return res.send({ success: data });
  } else {
    return res.send({ error: "No plan found for that month" });
  }
}

/**
 *  Function to set holiday Data
 */
async function setHoliday(req, res) {
  try {
    const newworkingdays = await getdates(
      req.body.yearmonth,
      req.body.holidays
    );
    const updatedcalendar = await calendar.findOneAndUpdate(
      { yearmonth: req.body.yearmonth },
      {
        workingdays: await newworkingdays.success,
        holidays: req.body.holidays,
      },
      { useFindAndModify: false, new: true, upsert: true }
    );
    if (updatedcalendar) {
      return res.send({ success: updatedcalendar });
    } else {
      return res.send({ error: "error updating database" });
    }
  } catch {
    (err) => {
      return res.send({ error: err });
    };
  }
}

/**
 *  Function delete Calendar Data
 */
async function deleteCalendarData(req, res) {
  try {
    const isdeleted = await calendar.findOneAndRemove(
      { yearmonth: req.body.yearmonth },
      { useFindAndModify: false, new: true }
    );
    if (isdeleted) {
      return res.send({ success: "Deleted calender" });
    }
  } catch {
    (err) => {
      return res.send({ error: err });
    };
  }
}

module.exports = {
  fetchAllCalendarData,
  fetchCalendatMonthData,
  setHoliday,
  deleteCalendarData,
};
