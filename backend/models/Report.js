const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

    incidentType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    anonymous: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
      ],
      default: "Pending",
    },

    code: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Report",
  reportSchema
);