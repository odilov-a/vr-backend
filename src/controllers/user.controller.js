const bcrypt = require("bcrypt");
const { sign } = require("../utils/jwt.js");
const User = require("../models/User.js");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find("-password", { isDeleted: false }).populate(
      "books"
    );
    return res.json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMeUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, {
      isDeleted: false,
    }).populate("books");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isActive === false) {
      return res.status(401).json({ message: "Account is not active" });
    }
    user.lastLogin = new Date();
    await user.save();
    return res.status(200).json({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        isActive: user.isActive,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      isDeleted: false,
    }).populate("books");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      ...otherData,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isActive === false) {
      return res.status(401).json({ message: "Account is not active" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.isDeleted === true) {
      return res.status(403).json({ message: "Account is deleted" });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = sign({
      id: user._id,
      role: user.role,
      createdAt: user.createdAt,
    });
    return res.status(200).json({
      data: {
        token,
        role: user.role,
        username: user.username,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.meUpdateUser = async (req, res) => {
  try {
    const { userId } = req;
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -role -createdAt -_id -lastLogin");
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
