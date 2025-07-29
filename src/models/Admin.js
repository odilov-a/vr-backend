const { Schema, model } = require("mongoose");
const adminSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Admin = model("Admin", adminSchema);
module.exports = Admin;
