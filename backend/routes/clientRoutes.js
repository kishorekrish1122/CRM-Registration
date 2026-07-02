
// const express = require("express");
// const router = express.Router();

// const {
//   addClient,
//   getClients,
//   getClientById,
//   updateClient,
//   deleteClient,
// } = require("../controllers/clientController");

// const { protect } = require("../middleware/authMiddleware");
// const authorizeRoles = require("../middleware/roleMiddleware");
// const upload = require("../middleware/uploadMiddleware");

// router.post(
//   "/",
//   protect,
//   authorizeRoles("vendor"),
//   upload.single("document"),
//   addClient
// );

// router.get(
//   "/",
//   protect,
//   authorizeRoles("vendor"),
//   getClients
// );

// router.get(
//   "/:id",
//   protect,
//   authorizeRoles("vendor"),
//   getClientById
// );

// router.put(
//   "/:id",
//   protect,
//   authorizeRoles("vendor"),
//   upload.single("document"),
//   updateClient
// );

// router.delete(
//   "/:id",
//   protect,
//   authorizeRoles("vendor"),
//   deleteClient
// );

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// FIX: upload.any() to accept multiple files with different fieldnames
router.post(
  "/",
  protect,
  authorizeRoles("vendor"),
  upload.any(),
  addClient
);

router.get(
  "/",
  protect,
  authorizeRoles("vendor"),
  getClients
);

router.get(
  "/:id",
  protect,
  authorizeRoles("vendor"),
  getClientById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("vendor"),
  upload.any(),
  updateClient
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("vendor"),
  deleteClient
);

module.exports = router;