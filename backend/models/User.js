const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
},
phone: {
  type: String,
  default: "",
},

emergencyContact: {
  type: String,
  default: "",
},

address: {
  type: String,
  default: "",
},

bloodGroup: {
  type: String,
  default: "",
},

gender: {
  type: String,
  enum: ["Male", "Female", "Other", ""],
  default: "",
},

age: {
  type: Number,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);