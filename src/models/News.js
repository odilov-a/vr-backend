const { Schema, model } = require("mongoose");
const newsSchema = new Schema(
  {
    titleUz: {
      type: String,
      required: true,
    },
    titleRu: {
      type: String,
      required: true,
    },
    titleEn: {
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

const News = model("News", newsSchema);
module.exports = News;
