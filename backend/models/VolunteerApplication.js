const mongoose = require("mongoose");

const volunteerApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },
latitude: {
  type: Number,
  default: 0,
},

longitude: {
  type: Number,
  default: 0,
},
    city: String,

    age: Number,

    skills: String,

    availability: String,

    experience: String,

    reason: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "VolunteerApplication",
  volunteerApplicationSchema
);