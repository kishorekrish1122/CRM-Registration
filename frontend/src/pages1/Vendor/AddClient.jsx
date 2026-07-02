import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClient } from "../../services/clientApi";

// Document categories with their documents
const DOCUMENT_CATEGORIES = {
  "Core Documents": [
    { id: "ec", label: "EC (Encumbrance Certificate)", sublabel: "வில்லங்கச் சான்றிதழ் (EC)", icon: "📄" },
    { id: "mother_deed", label: "Mother Deed / Moola Pathiram", sublabel: "மூலப் பத்திரம்", icon: "📋" },
    { id: "stamp", label: "Label / Stamp Verification", sublabel: "முத்திரைச் சரிபார்ப்பு", icon: "🖊️" },
    { id: "sale_record", label: "Sale Record", sublabel: "கிரயம்", icon: "📃" },
  ],
  "Registration Deed": [
    { id: "reg_deed", label: "Registration Deed", sublabel: "பதிவு பத்திரம்", icon: "📝" },
    { id: "sale_deed", label: "Sale Deed", sublabel: "விற்பனை பத்திரம்", icon: "📄" },
    { id: "gift_deed", label: "Gift Deed", sublabel: "தானப் பத்திரம்", icon: "📋" },
    { id: "partition_deed", label: "Partition Deed", sublabel: "பிரிவினை பத்திரம்", icon: "📃" },
    { id: "settlement_deed", label: "Settlement Deed", sublabel: "தீர்வு பத்திரம்", icon: "📄" },
    { id: "will_deed", label: "Will / Testament", sublabel: "உயில்", icon: "📝" },
    { id: "power_attorney", label: "Power of Attorney", sublabel: "அதிகார பத்திரம்", icon: "📋" },
    { id: "lease_deed", label: "Lease Deed", sublabel: "குத்தகை பத்திரம்", icon: "📃" },
    { id: "mortgage_deed", label: "Mortgage Deed", sublabel: "அடமான பத்திரம்", icon: "📄" },
    { id: "release_deed", label: "Release Deed", sublabel: "விடுதலை பத்திரம்", icon: "📝" },
    { id: "adoption_deed", label: "Adoption Deed", sublabel: "தத்தெடுப்பு பத்திரம்", icon: "📋" },
  ],
  "Assessment Services": [
    { id: "patta", label: "Patta / Chitta", sublabel: "பட்டா / சிட்டா", icon: "📄" },
    { id: "adangal", label: "Adangal", sublabel: "அடங்கல்", icon: "📋" },
    { id: "fmb", label: "FMB Sketch", sublabel: "புல வரைபடம்", icon: "🗺️" },
    { id: "tslr", label: "TSLR Extract", sublabel: "TSLR சாரம்", icon: "📃" },
    { id: "tax_receipt", label: "Property Tax Receipt", sublabel: "சொத்து வரி ரசீது", icon: "📄" },
    { id: "building_plan", label: "Building Plan Approval", sublabel: "கட்டட திட்ட ஒப்புதல்", icon: "📝" },
    { id: "occupancy", label: "Occupancy Certificate", sublabel: "குடியிருப்பு சான்று", icon: "📋" },
    { id: "land_value", label: "Land Value Certificate", sublabel: "நில மதிப்பு சான்று", icon: "📃" },
    { id: "survey", label: "Survey Document", sublabel: "அளவைப் பதிவேடு", icon: "📄" },
  ],
};

// Flatten all docs for "All Documents" tab
const ALL_DOCUMENTS = Object.values(DOCUMENT_CATEGORIES).flat();

function AddClient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    address: "",
    status: "Lead",
    priority: "Medium",
    notes: "",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Registration Services Documents state
  const [activeTab, setActiveTab] = useState("Core Documents");
  const [regDocs, setRegDocs] = useState({}); // { docId: File }
  const [extraDocs, setExtraDocs] = useState([]); // [{id, file}]

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegDocChange = (docId, file) => {
    setRegDocs((prev) => ({ ...prev, [docId]: file }));
  };

  const handleRemoveRegDoc = (docId) => {
    setRegDocs((prev) => {
      const updated = { ...prev };
      delete updated[docId];
      return updated;
    });
  };

  const handleAddExtraDoc = () => {
    setExtraDocs((prev) => [...prev, { id: Date.now(), file: null }]);
  };

  const handleExtraDocChange = (id, file) => {
    setExtraDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, file } : d))
    );
  };

  const handleRemoveExtraDoc = (id) => {
    setExtraDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const getTabDocs = () => {
    if (activeTab === "All Documents") return ALL_DOCUMENTS;
    return DOCUMENT_CATEGORIES[activeTab] || [];
  };

  const getTabCount = (tab) => {
    if (tab === "All Documents") return ALL_DOCUMENTS.length;
    return DOCUMENT_CATEGORIES[tab]?.length || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (file) {
        data.append("document", file);
      }

      // Append registration service documents
      Object.entries(regDocs).forEach(([docId, docFile]) => {
        if (docFile) data.append(docId, docFile);
      });

      extraDocs.forEach((d, i) => {
        if (d.file) data.append(`extra_doc_${i}`, d.file);
      });

      await addClient(data);

      alert("Client Added Successfully");
      navigate("/vendor/clients");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add client"
      );
    }
  };

  const tabs = ["Core Documents", "Registration Deed", "Assessment Services", "All Documents"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-2xl border border-slate-100">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Add Client
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Fill in the details to add a new client
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                placeholder="Enter client name"
                className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="client@example.com"
                className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Document (Other File)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                className="border border-slate-200 bg-slate-50 p-2 w-full rounded-lg text-slate-600 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-600 file:text-sm file:font-medium hover:file:bg-blue-100 transition"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Enter address"
              rows="3"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Status
              </label>
              <select
                name="status"
                className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Lead">Lead</option>
                <option value="Prospect">Prospect</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Priority
              </label>
              <select
                name="priority"
                className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Additional notes..."
              rows="4"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          {/* ===== Registration Services Documents ===== */}
          <div className="border border-blue-100 rounded-xl p-5 bg-blue-50/30">

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">📁</span>
              <h2 className="text-base font-semibold text-slate-800">
                Registration Services Documents
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Upload applicable documents from Registration Services
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {tab} ({getTabCount(tab)})
                </button>
              ))}
            </div>

            {/* Document rows */}
            <div className="space-y-3">
              {getTabDocs().map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 bg-white border border-slate-100 rounded-lg px-4 py-3"
                >
                  <span className="text-xl flex-shrink-0">{doc.icon}</span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {doc.label}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {doc.sublabel}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <label className="cursor-pointer px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-100 transition">
                      Choose file
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) =>
                          handleRegDocChange(doc.id, e.target.files[0])
                        }
                      />
                    </label>

                    {regDocs[doc.id] ? (
                      <>
                        <span className="text-xs text-slate-500 max-w-[90px] truncate">
                          {regDocs[doc.id].name}
                        </span>
                        <span className="text-green-500 text-base">✅</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRegDoc(doc.id)}
                          className="text-slate-400 hover:text-red-400 transition text-sm"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        No file
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Extra docs added by user */}
              {extraDocs.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 bg-white border border-dashed border-slate-200 rounded-lg px-4 py-3"
                >
                  <span className="text-xl">📎</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 italic">
                      Additional Document
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <label className="cursor-pointer px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-100 transition">
                      Choose file
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) =>
                          handleExtraDocChange(d.id, e.target.files[0])
                        }
                      />
                    </label>
                    {d.file && (
                      <>
                        <span className="text-xs text-slate-500 max-w-[90px] truncate">
                          {d.file.name}
                        </span>
                        <span className="text-green-500 text-base">✅</span>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveExtraDoc(d.id)}
                      className="text-slate-400 hover:text-red-400 transition text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Another Document */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={handleAddExtraDoc}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
              >
                <span className="text-base">＋</span> Add Another Document
              </button>
              <p className="text-xs text-slate-400">
                You can upload multiple documents
              </p>
            </div>

          </div>
          {/* ===== End Registration Services Documents ===== */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            + Add Client
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddClient;