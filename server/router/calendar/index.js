const router = require("express").Router();
const { checkadmin } = require("../../functions/User_check");
const calendarController = require("../../controller/calendar");

/**
 * Route to fetch all Canlendar Data
 */
router.post("/fetchall", checkadmin, async (req, res) => {
  calendarController.fetchAllCalendarData(req, res);
});

/**
 * Route to fetch month Data
 */
router.post("/fetchmonth", checkadmin, async (req, res) => {
  calendarController.fetchCalendatMonthData(req, res);
});

/**
 *  Route to set holiday Data
 */
router.post("/holiday", checkadmin, async (req, res) => {
  calendarController.setHoliday(req, res);
});

/**
 *  Route delete Calendar Data
 */
router.post("/delete", checkadmin, async (req, res) => {
  calendarController.deleteCalendarData(req, res);
});

module.exports = router;
