const { Schema, model } = require("mongoose");
const bookSchema = new Schema(
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
    price: {
      type: Number,
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

const Book = model("Book", bookSchema);
module.exports = Book;
