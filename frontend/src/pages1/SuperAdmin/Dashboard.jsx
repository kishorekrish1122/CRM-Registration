import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminApi";

function Dashboard() {
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalVendors: 0,
    totalClients: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats({
        totalAdmins: data.totalAdmins || 0,
        totalVendors: data.totalVendors || 0,
        totalClients: data.totalClients || 0,
      });
    } catch (err) {
      setError("Failed to load dashboard stats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      label: "Total Admins",
      value: stats.totalAdmins,
      color: "blue",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5L19 8v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V8l7-3.5z" />
        </svg>
      ),
      bg: "bg-blue-50",
      bar: "bg-blue-500",
    },
    {
      label: "Total Vendors",
      value: stats.totalVendors,
      color: "emerald",
      icon: (
        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
        </svg>
      ),
      bg: "bg-emerald-50",
      bar: "bg-emerald-500",
    },
    {
      label: "Total Clients",
      value: stats.totalClients,
      color: "violet",
      icon: (
        <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 100-8" />
        </svg>
      ),
      bg: "bg-violet-50",
      bar: "bg-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Super Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Overview of your platform activity
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                  {card.label}
                </h2>
                <p className="text-4xl mt-3 font-bold text-slate-800">
                  {loading ? (
                    <span className="inline-block w-10 h-8 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    card.value
                  )}
                </p>
              </div>
              <div className={`${card.bg} p-3 rounded-xl`}>
                {card.icon}
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-1 ${card.bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;