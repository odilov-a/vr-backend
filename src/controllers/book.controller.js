const Book = require("../models/Book.js");

const getLanguageField = (lang, type) => {
  const fields = {
    name: { uz: "nameUz", ru: "nameRu", en: "nameEn" },
    description: {
      uz: "descriptionUz",
      ru: "descriptionRu",
      en: "descriptionEn",
    },
  };
  return fields[type]?.[lang];
};

const formatBook = (book, lang) => {
  const nameField = getLanguageField(lang, "name");
  const descriptionField = getLanguageField(lang, "description");
  return {
    _id: book._id,
    name: book[nameField],
    nameEn: book.nameEn,
    nameRu: book.nameRu,
    nameUz: book.nameUz,
    description: book[descriptionField],
    descriptionEn: book.descriptionEn,
    descriptionRu: book.descriptionRu,
    descriptionUz: book.descriptionUz,
    price: book.price,
    photoUrls: book.photoUrls,
    pdfUrls: book.pdfUrls,
  };
};

exports.getAllBooks = async (req, res) => {
  try {
    const { lang } = req.query;
    const books = await Book.find({ isDeleted: false });
    const result = books.map((book) => formatBook(book, lang));
    return res.json({ data: result.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id, { isDeleted: false });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({ data: formatBook(book, req.query.lang) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ data: book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!book || book.isDeleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({ data: book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
