const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const VolunteerApplication = require("../models/VolunteerApplication");
const Report = require("../models/Report");
const SOS = require("../models/SOS");

// Dashboard Stats
router.get("/dashboard", async (req, res) => {
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
});

// All Volunteer Applications

router.get("/applications", async (req, res) => {

    try{

        const applications =
        await VolunteerApplication.find()

        .populate("user")

        .sort({createdAt:-1});

        res.json(applications);

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

// Approve Volunteer

router.put("/approve/:id", async (req,res)=>{

    try{

        const application =
        await VolunteerApplication.findById(req.params.id);

        if(!application){

            return res.status(404).json({
                message:"Application not found"
            });

        }

       application.status = "Approved";

await application.save();

// Check if already a volunteer
const existingVolunteer = await Volunteer.findOne({
  user: application.user,
});

if (existingVolunteer) {
  return res.status(400).json({
    message: "Volunteer already approved",
  });
}

await Volunteer.create({
  user: application.user,

  phone: application.phone,

  skill: application.skills || "General Help",

  latitude: application.latitude ?? 0,

longitude: application.longitude ?? 0,

  verified: true,

  available: true,
});

        res.json({

            message:"Volunteer Approved"

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

router.put("/reject/:id", async(req,res)=>{

    try{

        await VolunteerApplication.findByIdAndUpdate(

            req.params.id,

            {

                status:"Rejected"

            }

        );

        res.json({

            message:"Application Rejected"

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

module.exports = router;