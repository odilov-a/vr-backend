const User = require("../models/User.js");
const Book = require("../models/Book.js");

exports.buyBook = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookId } = req.body;
    const book = await Book.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const user = await User.findOne({ _id: userId, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.books.includes(bookId)) {
      return res.status(400).json({ message: "User already owns this book" });
    }
    user.books.push(bookId);
    await user.save();
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
