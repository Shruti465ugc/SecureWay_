const express = require("express");
const router = express.Router();

const Report = require("../models/Report");

router.get("/", async (req, res) => {
  try {

    const reports = await Report.find()
      .sort({ createdAt: -1 });

    res.json(reports);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});

// Stats

router.get("/stats", async (req, res) => {

  try {

    const reports = await Report.find();

    const stats = {
      Accident: 0,
      Fire: 0,
      "Medical Emergency": 0,
      Crime: 0,
      Flood: 0,
      Other: 0,
    };

    reports.forEach((report) => {

      if (stats[report.incidentType] !== undefined) {

        stats[report.incidentType]++;

      }

    });

    res.json(stats);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

// Create Report

router.post("/", async (req, res) => {

  try {

   const {
 userId,
  incidentType,
  description,
  location,
  severity,
  anonymous,
} = req.body;

    const count =
      await Report.countDocuments();

    const report = await Report.create({

  user: userId || null,

  incidentType,

  description,

  location,

  severity,

  anonymous,

  code: "SR-" + (1001 + count),

});

    res.status(201).json(report);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

// Update Status

router.patch("/:id/status", async (req, res) => {

  try {

    const report =
      await Report.findByIdAndUpdate(

        req.params.id,

        {
          status: req.body.status,
        },

        {
          new: true,
        }

      );

    res.json(report);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;