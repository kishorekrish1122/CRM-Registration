const User = require("../models/User");
const Client = require("../models/Client");

const ASSIGNABLE_ROLES = ["admin", "vendor"];

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const adminExists = await User.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
      status: "active",
      createdBy: req.user._id,
    });

    const { password: _pw, ...adminData } = admin.toObject();

    res.status(201).json(adminData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin", status: "active" }).select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingAdmins = async (req, res) => {
  try {
    const pending = await User.find({ status: "pending" }).select("-password");
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveAdmin = async (req, res) => {
  try {
    const { role } = req.body;
    const normalizedRole = role?.toLowerCase();

    if (!ASSIGNABLE_ROLES.includes(normalizedRole)) {
      return res.status(400).json({
        message: `Role must be one of: ${ASSIGNABLE_ROLES.join(", ")}`,
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status !== "pending") {
      return res.status(400).json({ message: "This user is not pending approval" });
    }

    user.role = normalizedRole;
    user.status = "active";
    user.createdBy = req.user._id;
    await user.save();

    const { password: _pw, ...userData } = user.toObject();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status !== "pending") {
      return res.status(400).json({ message: "This user is not pending approval" });
    }

    user.status = "rejected";
    await user.save();

    res.json({ message: "User rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminById = async (req, res) => {
  console.log("=== getAdminById CALLED with id:", req.params.id, "===");
  try {
    const admin = await User.findOne({
      _id: req.params.id,
      role: "admin",
    }).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const admin = await User.findOne({
      _id: req.params.id,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (email && email !== admin.email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return res.status(400).json({ message: "Email already in use" });
      }
      admin.email = email;
    }

    if (name) admin.name = name;
    if (password) admin.password = password;

    const updatedAdmin = await admin.save();

    const { password: _pw, ...adminData } = updatedAdmin.toObject();

    res.json(adminData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findOneAndDelete({
      _id: req.params.id,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin", status: "active" }).select("name email createdAt");
    const vendors = await User.find({ role: "vendor", status: "active" }).select("name email createdAt");
    const clients = await Client.find({}).select("clientName email phone status priority createdAt vendorId");

    res.json({
      totalAdmins: admins.length,
      totalVendors: vendors.length,
      totalClients: clients.length,
      admins,
      vendors,
      clients,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVendorsForSuperAdmin = async (req, res) => {
  console.log("=== getAllVendorsForSuperAdmin CALLED ===");
  try {
    const vendors = await User.find({ role: "vendor", status: "active" })
      .select("-password");
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllClientsForSuperAdmin = async (req, res) => {
  console.log("=== getAllClientsForSuperAdmin CALLED ===");
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
  getAdmins,
  getPendingAdmins,
  approveAdmin,
  rejectAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getDashboardStats,
  getAllVendorsForSuperAdmin,
  getAllClientsForSuperAdmin,
};