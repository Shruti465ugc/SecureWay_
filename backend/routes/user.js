const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

  res.json({
  id: updatedUser._id,
  name: updatedUser.name,
  email: updatedUser.email,
  role: updatedUser.role,
  phone: updatedUser.phone,
  emergencyContact: updatedUser.emergencyContact,
  address: updatedUser.address,
  bloodGroup: updatedUser.bloodGroup,
  gender: updatedUser.gender,
  age: updatedUser.age,
});

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;