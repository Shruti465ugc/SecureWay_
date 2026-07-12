const VolunteerApplication = require("../models/VolunteerApplication");
const Volunteer = require("../models/Volunteer");
const User = require("../models/User");
const Report = require("../models/Report");
const SOS = require("../models/SOS");


// Dashboard Stats
exports.dashboard = async (req, res) => {
  try {

    const totalApplications = await VolunteerApplication.countDocuments();

    const pendingApplications =
      await VolunteerApplication.countDocuments({
        status: "Pending",
      });

    const totalVolunteers =
      await Volunteer.countDocuments();

    const totalReports =
      await Report.countDocuments();

    const totalSOS =
      await SOS.countDocuments();

    res.json({
      totalApplications,
      pendingApplications,
      totalVolunteers,
      totalReports,
      totalSOS,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Get All Applications
exports.getApplications = async (req, res) => {

  try {

    const applications =
      await VolunteerApplication.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    res.json(applications);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// Approve Application
exports.approveApplication = async (req, res) => {

  try {

    const application =
      await VolunteerApplication.findById(req.params.id);

    if (!application) {

      return res.status(404).json({
        message: "Application not found",
      });

    }

    if (application.status === "Approved") {

      return res.json({
        message: "Already Approved",
      });

    }

    application.status = "Approved";

    await application.save();

    await Volunteer.create({

      user: application.user,

      phone: application.phone,

      skill: application.skills,

      available: true,

      verified: true,

    });

    res.json({
      message: "Volunteer Approved Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// Reject Application
exports.rejectApplication = async (req, res) => {

  try {

    await VolunteerApplication.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      }
    );

    res.json({
      message: "Application Rejected",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};