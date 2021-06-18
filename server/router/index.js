const express = require("express");
const app = express();
const userRoutes = require("./users/user_details");
const patientDetailsRoutes = require("./patients/patient_details");
const patientRecordsRoutes = require("./patients/patient_records");
const patientComplaintRoutes = require("./patients/patient_complaint");
const patientQueRoutes = require("./patients/patient_que");
const calendarRoutes = require("./calendar");
const attendenceRoutes = require("./users/user_attendence");
const doctorStatisticsRoutes = require("./doctor/doctor_statistics");
/**
 * Routes related to Users
 */
app.use("/user", userRoutes);
/**
 * Routes related to Patients
 */
app.use("/patient", patientDetailsRoutes);
/**
 * Routes related to Patients' Records
 */
app.use("/patient/record", patientRecordsRoutes);
/**
 * Routes related to Patients' complaint
 */
app.use("/patient/complaint", patientComplaintRoutes);
/**
 * Routes related to Patients' que
 */
app.use("/patient/que", patientQueRoutes);
/**
 * Routes related to Users Calendar
 */
app.use("/calendar", calendarRoutes);
/**
 * Routes related to Users Attendence
 */
app.use("/attendence", attendenceRoutes);
/**
 * Routes related to Doctor Statistics
 */
app.use("/doctorstats", doctorStatisticsRoutes);

module.exports = app;
