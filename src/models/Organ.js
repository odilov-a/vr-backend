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
    type: {
      type: Number,
      enum: [1, 2], // 1 = male organ, 2 = female organ
      required: true,
    },
    photoUrls: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
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
