import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function Reports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/admin/dashboard");
      setStats(response.data);
    } catch (err) {
      setError("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: "Total Admins", key: "totalAdmins", color: "blue", icon: "🛡️" },
    { label: "Total Vendors", key: "totalVendors", color: "emerald", icon: "🏪" },
    { label: "Total Clients", key: "totalClients", color: "violet", icon: "👥" },
  ];

  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Reports</h1>
        <p className="text-slate-500 mt-1">Platform summary and statistics</p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.key}
            className={`bg-white border rounded-2xl p-6 shadow-sm flex items-center gap-4 ${colorMap[card.color]}`}
          >
            <span className="text-3xl">{card.icon}</span>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                {loading ? (
                  <span className="inline-block w-8 h-7 bg-slate-100 rounded animate-pulse" />
                ) : (
                  stats?.[card.key] ?? 0
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Platform Overview</h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => {
              const value = stats?.[card.key] ?? 0;
              const max = Math.max(
                stats?.totalAdmins ?? 1,
                stats?.totalVendors ?? 1,
                stats?.totalClients ?? 1,
                1
              );
              const percent = Math.round((value / max) * 100);

              return (
                <div key={card.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 font-medium">{card.label}</span>
                    <span className="text-slate-500">{value}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        card.color === "blue" ? "bg-blue-500" : card.color === "emerald" ? "bg-emerald-500" : "bg-violet-500"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;