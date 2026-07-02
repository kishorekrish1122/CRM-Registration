const User = require("../models/User");

// Create Vendor
const createVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const vendorExists = await User.findOne({ email });

    if (vendorExists) {
      return res.status(400).json({
        message: "Vendor already exists",
      });
    }

    const vendor = await User.create({
      name,
      email,
      password,
      role: "vendor",
      status: "active",
      createdBy: req.user._id,
    });

    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Vendors
const getVendors = async (req, res) => {
  const vendors = await User.find({
    role: "vendor",
    status: "active",
  });

  res.json(vendors);
};

// Delete Vendor
const deleteVendor = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "Vendor deleted",
  });
};

module.exports = {
  createVendor,
  getVendors,
  deleteVendor,
};