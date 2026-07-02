
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientById, updateClient } from "../../services/clientApi";

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();

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
  const [existingDocument, setExistingDocument] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const UPLOADS_BASE_URL = "http://localhost:5000/uploads";

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientById(id);
        setFormData({
          clientName: data.clientName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          status: data.status || "Lead",
          priority: data.priority || "Medium",
          notes: data.notes || "",
        });
        setExistingDocument(data.document || "");
      } catch (err) {
        setError("Failed to load client details");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

      await updateClient(id, data);

      alert("Client Updated Successfully");
      navigate("/vendor/clients");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update client"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Loading client details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-2xl border border-slate-100">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Edit Client
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update the client details below
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
                Document
              </label>

              {/* Show existing document if any */}
              {existingDocument && !file && (
                <div className="mb-2 flex items-center gap-2">
                  <a
                    href={`${UPLOADS_BASE_URL}/${existingDocument}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs truncate max-w-[180px]"
                  >
                    {existingDocument}
                  </a>
                  <span className="text-slate-400 text-xs">(current)</span>
                </div>
              )}

              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                className="border border-slate-200 bg-slate-50 p-2 w-full rounded-lg text-slate-600 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-600 file:text-sm file:font-medium hover:file:bg-blue-100 transition"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <p className="text-xs text-slate-400 mt-1">
                Leave empty to keep the existing document
              </p>
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

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/vendor/clients")}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
            >
              Update Client
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default EditClient;