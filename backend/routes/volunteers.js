const express = require("express");
const router = express.Router();

const Volunteer = require("../models/Volunteer");
const { getDistanceKm } = require("../utils");

router.get("/nearby", async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);
    const radius = req.query.radius
      ? parseFloat(req.query.radius)
      : 5;

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({
        error: "lat and lon required",
      });
    }

    const volunteers = await Volunteer.find({
      available: true,
      verified: true,
    });

    let result = [];

    for (const v of volunteers) {
      const dist = getDistanceKm(
        lat,
        lon,
        v.latitude,
        v.longitude
      );

      if (dist <= radius) {
        result.push({
          ...v.toObject(),
          distanceKm: Number(dist.toFixed(2)),
        });
      }
    }

    result.sort((a, b) => a.distanceKm - b.distanceKm);

    res.json(result);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, phone, skill, lat, lon } = req.body;

    const existing = await Volunteer.findOne({ user: userId });

    if (existing) {
      return res.status(400).json({
        message: "You are already registered as a volunteer."
      });
    }

    const volunteer = await Volunteer.create({
      user: userId,
      phone,
      skill,
      latitude: lat,
      longitude: lon,
      available: true,
      verified: false
    });

    res.status(201).json({
      message: "Volunteer application submitted successfully.",
      volunteer
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.get("/me/:userId", async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({
      user: req.params.userId,
    });

    if (!volunteer) {
      return res.status(404).json({
        message: "You are not an approved volunteer.",
      });
    }

    res.json(volunteer);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});



router.get("/pending", async (req, res) => {

    try{

        const volunteers = await Volunteer.find({
            verified:false
        }).populate("user","name email");

        res.json(volunteers);

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

router.put("/approve/:id", async (req,res)=>{

    try{

        const volunteer = await Volunteer.findById(req.params.id);

        if(!volunteer){

            return res.status(404).json({
                message:"Volunteer not found"
            });

        }

        volunteer.verified = true;

        await volunteer.save();

        res.json({
            message:"Volunteer Approved"
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

router.delete("/reject/:id", async (req,res)=>{

    try{

        await Volunteer.findByIdAndDelete(req.params.id);

        res.json({
            message:"Volunteer Rejected"
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

router.put("/toggle/:id", async (req,res)=>{

try{

const volunteer=await Volunteer.findOne({
user:req.params.id
});

volunteer.available=!volunteer.available;

await volunteer.save();

res.json(volunteer);

}catch(err){

console.log(err);

res.status(500).json({
message:"Server Error"
});

}

});

router.put("/location/:id", async (req, res) => {
  try {

    const { latitude, longitude } = req.body;

    const volunteer = await Volunteer.findOne({
      user: req.params.id,
    });

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found",
      });
    }

    volunteer.latitude = latitude;
    volunteer.longitude = longitude;

    await volunteer.save();

    res.json({
      message: "Location Updated",
      volunteer,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ---------------- GET VERIFIED VOLUNTEERS ----------------

router.get("/verified", async (req, res) => {

  try {

    const volunteers = await Volunteer.find({

      verified: true,

      available: true,

    }).populate("user");

    res.json(volunteers);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Server Error"

    });

  }

});

module.exports = router;