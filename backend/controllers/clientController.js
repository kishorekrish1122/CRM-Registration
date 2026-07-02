
// const Client = require("../models/Client");

// // Add Client
// const addClient = async (req, res) => {
//   try {
//     const {
//       clientName,
//       email,
//       phone,
//       address,
//       status,
//       priority,
//       notes,
//     } = req.body;

//     const client = await Client.create({
//       clientName,
//       email,
//       phone,
//       address,
//       status,
//       priority,
//       notes,
//       document: req.file ? req.file.filename : "",
//       vendorId: req.user._id,
//     });

//     res.status(201).json(client);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Clients
// const getClients = async (req, res) => {
//   try {
//     const clients = await Client.find({ vendorId: req.user._id });
//     res.json(clients);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Client By ID
// const getClientById = async (req, res) => {
//   try {
//     const client = await Client.findOne({
//       _id: req.params.id,
//       vendorId: req.user._id,
//     });

//     if (!client) {
//       return res.status(404).json({ message: "Client not found" });
//     }

//     res.json(client);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Client
// const updateClient = async (req, res) => {
//   try {
//     const {
//       clientName,
//       email,
//       phone,
//       address,
//       status,
//       priority,
//       notes,
//     } = req.body;

//     const client = await Client.findOne({
//       _id: req.params.id,
//       vendorId: req.user._id,
//     });

//     if (!client) {
//       return res.status(404).json({ message: "Client not found" });
//     }

//     client.clientName = clientName || client.clientName;
//     client.email = email || client.email;
//     client.phone = phone || client.phone;
//     client.address = address || client.address;
//     client.status = status || client.status;
//     client.priority = priority || client.priority;
//     client.notes = notes || client.notes;

//     // Only update document if a new file was uploaded
//     if (req.file) {
//       client.document = req.file.filename;
//     }

//     const updatedClient = await client.save();
//     res.json(updatedClient);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete Client
// const deleteClient = async (req, res) => {
//   try {
//     await Client.findByIdAndDelete(req.params.id);
//     res.json({ message: "Client deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   addClient,
//   getClients,
//   getClientById,
//   updateClient,
//   deleteClient,
// };
const Client = require("../models/Client");

// Add Client
const addClient = async (req, res) => {
  try {
    const {
      clientName,
      email,
      phone,
      address,
      status,
      priority,
      notes,
    } = req.body;

    // req.files is an array when using upload.any()
    const files = req.files || [];

    // Main document (fieldname === "document")
    const mainDoc = files.find((f) => f.fieldname === "document");

    // Registration service docs — all other uploaded files
    const registrationDocs = {};
    files.forEach((f) => {
      if (f.fieldname !== "document") {
        registrationDocs[f.fieldname] = f.filename;
      }
    });

    const client = await Client.create({
      clientName,
      email,
      phone,
      address,
      status,
      priority,
      notes,
      document: mainDoc ? mainDoc.filename : "",
      registrationDocs,
      vendorId: req.user._id,
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ vendorId: req.user._id });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Client By ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      vendorId: req.user._id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Client
const updateClient = async (req, res) => {
  try {
    const {
      clientName,
      email,
      phone,
      address,
      status,
      priority,
      notes,
    } = req.body;

    const client = await Client.findOne({
      _id: req.params.id,
      vendorId: req.user._id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.clientName = clientName || client.clientName;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.address = address || client.address;
    client.status = status || client.status;
    client.priority = priority || client.priority;
    client.notes = notes || client.notes;

    const files = req.files || [];

    // Update main document if uploaded
    const mainDoc = files.find((f) => f.fieldname === "document");
    if (mainDoc) {
      client.document = mainDoc.filename;
    }

    // Update registration docs if any uploaded
    files.forEach((f) => {
      if (f.fieldname !== "document") {
        client.registrationDocs.set(f.fieldname, f.filename);
      }
    });

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Client
const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};