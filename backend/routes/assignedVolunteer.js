const express = require("express");
const router = express.Router();

const SOS = require("../models/SOS");
const Volunteer = require("../models/Volunteer");
const User = require("../models/User");

// GET Assigned Volunteer
router.get("/:userName", async (req, res) => {
  try {
    const sos = await SOS.findOne({
      userName: req.params.userName,
      status: "Accepted",
    }).sort({ createdAt: -1 });

    if (!sos) {
      return res.json(null);
    }

    const volunteer = await Volunteer.findById(sos.acceptedBy);

    if (!volunteer) {
      return res.json(null);
    }

    const volunteerUser = await User.findById(volunteer.user);

    res.json({
      name: volunteerUser.name,
      phone: volunteer.phone,
      skill: volunteer.skill,
      latitude: volunteer.latitude,
      longitude: volunteer.longitude,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;