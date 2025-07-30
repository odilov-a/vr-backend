const { Schema, model } = require("mongoose");
const organSchema = new Schema(
  {
    nameUz: {
      type: String,
      required: true,
    },
    nameRu: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    descriptionUz: {
      type: String,
      required: true,
    },
    descriptionRu: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
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

const Organ = model("Organ", organSchema);
module.exports = Organ;
