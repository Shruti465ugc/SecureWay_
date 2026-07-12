const express = require("express");
const router = express.Router();

const SOS = require("../models/SOS");
const Volunteer = require("../models/Volunteer");
const { getDistanceKm } = require("../utils/distance");

// ---------------- CREATE SOS ----------------

router.post("/", async (req, res) => {
  console.log("===== NEW SOS ROUTE =====");
  console.log(req.body);

  try {
    const { latitude, longitude, userName } = req.body;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        message: "Latitude and Longitude are required",
      });
    }
console.log("REQ BODY:", req.body);
console.log("USER ID:", req.body.userId);
console.log("TYPE:", typeof req.body.userId);
    const sos = await SOS.create({
          user: req.body.userId,
      userName,
      latitude,
      longitude,
    });

    const volunteers = await Volunteer.find({
      verified: true,
      available: true,
    });

    const nearby = volunteers
      .map((v) => ({
        ...v.toObject(),
        distanceKm: getDistanceKm(
          latitude,
          longitude,
          v.latitude,
          v.longitude
        ),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 5);

    res.status(201).json({
      message: "SOS Sent Successfully",
      sos,
      nearbyVolunteers: nearby,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ---------------- GET PENDING SOS ----------------

router.get("/pending", async (req, res) => {
  try {

    const sos = await SOS.find({
      status: "Pending",
    }).sort({ createdAt: -1 });

    res.json(sos);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});



router.get("/assigned/:volunteerId", async (req, res) => {
  try {
    const sos = await SOS.findOne({
      acceptedBy: req.params.volunteerId,
      status: "Accepted",
    }).sort({ createdAt: -1 });

    if (!sos) {
      return res.json(null);
    }

    res.json(sos);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ---------------- TRACK SOS ----------------

router.get("/tracking/user/:userId", async (req, res) => {

    try{

        const sos = await SOS.findOne({

            user:req.params.userId,

            status:{
                $in:["Pending","Accepted"]
            }

        })

        .sort({createdAt:-1})

        .populate({

            path:"acceptedBy",

            populate:{
                path:"user",
                select:"name email"
            }

        });

        if(!sos){

            return res.json(null);

        }

        res.json({

            sosId:sos._id,

            status:sos.status,

            volunteer:sos.acceptedBy

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Server Error"

        });

    }

});



// ---------------- ACCEPT SOS ----------------

router.put("/:id/accept/:volunteerId", async (req, res) => {
  try {
const sos = await SOS.findById(req.params.id);

if (!sos) {
  return res.status(404).json({
    message: "SOS not found",
  });
}

if (sos.status !== "Pending") {
  return res.status(400).json({
    message: "This SOS has already been accepted.",
  });
}

sos.status = "Accepted";
sos.acceptedBy = req.params.volunteerId;

await sos.save();

    await Volunteer.findByIdAndUpdate(
      req.params.volunteerId,
      {
        available: false,
      }
    );

    res.json({
      message: "SOS Accepted",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});


// ---------------- COMPLETE SOS ----------------

router.put("/:id/complete", async (req, res) => {
  try {

    const sos = await SOS.findById(req.params.id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS not found",
      });
    }

    sos.status = "Completed";

    await sos.save();

    if (sos.acceptedBy) {

      const volunteer = await Volunteer.findById(
        sos.acceptedBy
      );

      volunteer.available = true;

      volunteer.totalRescues += 1;

      await volunteer.save();

    }

    res.json({
      message: "Rescue Completed",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});



module.exports = router;