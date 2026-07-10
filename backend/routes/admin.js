const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

router.get("/dashboard", (req, res) => {

  const db = readDB();

  const applications = db.volunteerApplications || [];

  const volunteers = db.volunteers || [];

  const reports = db.reports || [];

  const sos = db.sosAlerts || [];

  res.json({

    totalApplications: applications.length,

    pendingApplications: applications.filter(
      a => a.status === "Pending"
    ).length,

    approvedApplications: applications.filter(
      a => a.status === "Approved"
    ).length,

    totalVolunteers: volunteers.length,

    totalReports: reports.length,

    totalSOS: sos.length

  });

});

module.exports = router;