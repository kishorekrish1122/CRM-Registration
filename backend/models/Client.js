const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Lead", "Prospect", "Active", "Inactive"],
      default: "Lead",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    notes: {
      type: String,
    },
    document: {
      type: String,
      default: "",
    },
    // Stores registration service documents as { docId: filename }
    registrationDocs: {
      type: Map,
      of: String,
      default: {},
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);