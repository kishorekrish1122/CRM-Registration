// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["superadmin", "admin", "vendor"],
//       default: "vendor",
//     },
//     // pending  -> just registered, awaiting superadmin decision
//     // active   -> approved, can log in
//     // rejected -> denied, cannot log in
//     status: {
//       type: String,
//       enum: ["pending", "active", "rejected"],
//       default: "pending",
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// // Hash password only when it's new or has changed.
// // Relied on by adminController.updateAdmin, which sets admin.password = newPassword
// // only conditionally — isModified stays false when the field isn't touched.
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Used by authController.login, authController.changePassword/resetPassword
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "vendor", null],
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    resetOtp: {
      type: String,
      default: undefined,
    },
    resetOtpExpiry: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true }
);

// FIX: removed next() — modern mongoose async pre hooks don't need it
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);