const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const {
notFound,
errorHandler,
} = require("./middleware/errorMiddleware");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload Folder Access
app.use(
"/uploads",
express.static(
path.join(__dirname, "uploads")
)
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/vendor", require("./routes/vendorRoutes"));
app.use("/api/client", require("./routes/clientRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));

// Home Route
app.get("/", (req, res) => {
res.send("Vendor Client Management API Running...");
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
