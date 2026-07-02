const User = require("../models/User");
const Client = require("../models/Client");

// Dashboard Report
const getDashboardReport = async (req, res) => {
  try {
    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalVendors = await User.countDocuments({
      role: "vendor",
    });

    const totalClients = await Client.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalAdmins,
        totalVendors,
        totalClients,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Recent Users
const getRecentUsers = async (req, res) => {
  try {
    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: recentUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardReport,
  getRecentUsers,
};