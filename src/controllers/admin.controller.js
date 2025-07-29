const bcrypt = require("bcrypt");
const Admin = require("../models/Admin.js");
const { sign } = require("../utils/jwt.js");

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ isDeleted: false }).select("-password");
    return res.json({ data: admins });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMeAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id, "username -_id role", {
      isDeleted: false,
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      _id: req.admin.id,
      isDeleted: false,
    }).select("username -_id");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = new Admin({
      ...otherData,
      password: hashedPassword,
    });
    await admin.save();
    return res.status(201).json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (admin.isDeleted === true) {
      return res.status(403).json({ message: "Admin account is deleted" });
    }
    const token = sign({
      id: admin._id,
      role: admin.role,
      username: admin.username,
      createdAt: admin.createdAt,
    });
    return res.status(200).json({
      data: {
        token,
        role: admin.role,
        username: admin.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.meUpdateAdmin = async (req, res) => {
  try {
    const { userId } = req;
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const admin = await Admin.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!admin || admin.isDeleted) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const updateData = { username };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedAdmin || updatedAdmin.isDeleted) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json({ message: "Admin updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
