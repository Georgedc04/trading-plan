"use client";
import { useEffect, useState } from "react";
import Stats from "@/components/Stats";
import EquityCurve from "@/components/EquityCurve";
import TradesTable from "@/components/TradesTable";
import { Plus, LogOut, Loader2, AlertTriangle, LineChart } from "lucide-react";

type Plan = {
  id: number;
  date: string;
  week: number;
  day: string;
  session: string;
  result: string;
  amount: number;
  pair: string;
  note: string;
};

export default function Dashboard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      window.location.href = "/login";
      return;
    }

    // Wake database first (Railway cold start fix)
    fetch("/api/ping")
      .then(() => {
        return fetch(`/api/plan?userId=${userId}`);
      })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          console.error("API returned error:", data);
          setError("Failed to load trades");
          setPlans([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load plans:", err);
        setError("Server error");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  // Upgraded Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-sky-500 mb-4" />
        <p className="text-lg font-medium tracking-wide">Syncing Workspace...</p>
      </div>
    );
  }

  // Upgraded Error UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-8 text-center max-w-md w-full shadow-lg">
          <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-rose-400 mb-2">Connection Error</h3>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  // Upgraded Empty State
  if (!plans.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-10 text-center max-w-lg w-full shadow-sm">
          <div className="bg-slate-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <LineChart className="w-10 h-10 text-sky-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-50 mb-3 tracking-tight">No Trades Recorded Yet</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Your dashboard is looking a little empty. Add your first trade to generate your equity curve and performance statistics.
          </p>
          <a href="/add-plan" className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 w-full sm:w-auto">
            <Plus size={20} />
            Log Your First Trade
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Upgraded Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-50 tracking-tight">Trading Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Track your performance and analyze your edge.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a href="/add-plan" className="flex-1 sm:flex-none">
            <button className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-sky-500/20 hover:shadow-sky-500/40">
              <Plus size={18} />
              <span>Add Trade</span>
            </button>
          </a>

          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800/40 hover:bg-rose-500/10 border border-slate-700/50 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Child components will naturally stack using the mt-8 classes we gave them earlier */}
      <Stats plans={plans} />
      <EquityCurve plans={plans} />
      <TradesTable plans={plans} />
    </div>
  );
}