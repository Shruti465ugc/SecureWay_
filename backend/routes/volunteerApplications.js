const express = require("express");
const router = express.Router();

const VolunteerApplication = require("../models/VolunteerApplication");
const Volunteer = require("../models/Volunteer");




// POST application
router.post("/", async (req, res) => {
  try {
   const {
  user,
  phone,
  city,
  age,
  skills,
  availability,
  experience,
  reason,
  latitude,
  longitude,
} = req.body;

    const existing = await VolunteerApplication.findOne({ user });

    if (existing) {
      return res.status(400).json({
        message: "You have already submitted an application.",
      });
    }

    const application = await VolunteerApplication.create({
      user,
      phone,
      city,
      age,
      skills,
      availability,
      experience,
      reason,
       latitude,
    longitude,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// GET applications
router.get("/", async (req, res) => {
  try {
    const applications = await VolunteerApplication.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.post("/:id/approve", async (req, res) => {
  try {
    const application = await VolunteerApplication.findById(req.params.id)
      .populate("user");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "Approved";
    await application.save();

    const alreadyVolunteer = await Volunteer.findOne({
      user: application.user._id,
    });

    if (!alreadyVolunteer) {
      await Volunteer.create({
        user: application.user._id,
        name: application.user.name,
        phone: application.phone,
        skill: application.skills,
      latitude: application.latitude,
longitude: application.longitude,
        available: true,
        verified: true,
      });
    }

    res.json({
      message: "Volunteer Approved Successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await VolunteerApplication.findByIdAndDelete(req.params.id);

    res.json({
      message: "Application Deleted",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;