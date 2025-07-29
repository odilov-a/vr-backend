const { Schema, Types, model } = require("mongoose");
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
    },
    books: [
      {
        type: Types.ObjectId,
        ref: "Book",
      },
    ],
    role: {
      type: String,
      default: "USER",
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const User = model("User", userSchema);
module.exports = User;
