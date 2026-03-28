"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft,  TrendingUp, TrendingDown, Ban } from "lucide-react";

export default function AddPlan() {
  const router = useRouter();
  
  // Your exact original state variables
  const [date, setDate] = useState("");
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [session, setSession] = useState("London");
  const [result, setResult] = useState("TP");
  const [amount, setAmount] = useState("0");
  const [pair, setPair] = useState("XAUUSD");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Your exact original logic
  const calculateDayAndWeek = (selectedDate: string) => {
    const d = new Date(selectedDate);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayName = days[d.getDay()];
    setDay(dayName);

    if (dayName === "Saturday" || dayName === "Sunday") {
      alert("No trading on weekends");
      setDate("");
      setDay("");
      setWeek("");
      return;
    }

    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    const weekNumber = Math.ceil((d.getDate() + firstDay.getDay()) / 7);
    setWeek(String(weekNumber));
  };

  // Your exact original submit logic (with e.preventDefault() added for the new form wrapper)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId || !date) {
      alert("Missing data");
      return;
    }

    setLoading(true);

    let finalAmount = Number(amount);
    if (result === "SL") finalAmount = -Math.abs(finalAmount);
    if (result === "TP") finalAmount = Math.abs(finalAmount);
    if (result === "No Trade") finalAmount = 0;

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          date,
          week,
          day,
          session,
          result,
          amount: finalAmount,
          pair,
          note,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.error || "Error saving trade");
        return;
      }

      alert("Trade saved");
      router.push("/dashboard"); // Upgraded to Next.js instant routing
    } catch (err) {
      console.error(err);
      alert("Network error while saving");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      
      {/* Premium Header & Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard"
          className="p-2.5 bg-slate-800/40 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-50 tracking-tight">
            Add Trade
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Record your execution details to update your analytics.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        
        {/* Section 1: Trade Context */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Trade Context
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  calculateDayAndWeek(e.target.value);
                }}
                className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Pair</label>
              <select
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all cursor-pointer"
              >
                {/* Restored your exact options */}
                <option value="XAUUSD">XAUUSD</option>
                <option value="EURUSD">EURUSD</option>
                <option value="GBPUSD">GBPUSD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Session</label>
              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all cursor-pointer"
              >
                {/* Restored your exact options */}
                <option value="London">London</option>
                <option value="NY">NY</option>
              </select>
            </div>
            
            {/* Auto-calculated Day and Week (Read Only display) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Day</label>
                <div className="w-full bg-slate-800/30 border border-slate-700/50 text-slate-400 rounded-lg px-3 py-2.5 cursor-not-allowed">
                  {day || "-"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Week</label>
                <div className="w-full bg-slate-800/30 border border-slate-700/50 text-slate-400 rounded-lg px-3 py-2.5 cursor-not-allowed">
                  {week || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Outcome */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Execution Outcome
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Result</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setResult("TP")}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    result === "TP"
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                      : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  <TrendingUp size={18} className="mb-1" />
                  <span className="text-xs font-semibold">TP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setResult("SL")}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    result === "SL"
                      ? "bg-rose-500/10 border-rose-500/50 text-rose-400"
                      : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  <TrendingDown size={18} className="mb-1" />
                  <span className="text-xs font-semibold">SL</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResult("No Trade");
                    setAmount("0");
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    result === "No Trade"
                      ? "bg-slate-500/20 border-slate-400/50 text-slate-300"
                      : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  <Ban size={18} className="mb-1" />
                  <span className="text-xs font-semibold text-center leading-tight">No Trade</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  required
                  step="0.01"
                  disabled={result === "No Trade"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full border rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 transition-all font-medium tracking-wide ${
                    result === "No Trade"
                      ? "bg-slate-800/30 border-slate-800 text-slate-500 cursor-not-allowed"
                      : result === "TP"
                      ? "bg-slate-900/50 border-emerald-500/30 text-emerald-400 focus:ring-emerald-500/50 focus:border-emerald-500"
                      : result === "SL"
                      ? "bg-slate-900/50 border-rose-500/30 text-rose-400 focus:ring-rose-500/50 focus:border-rose-500"
                      : "bg-slate-900/50 border-slate-700 text-slate-200 focus:ring-slate-500/50"
                  }`}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Value auto-formats to positive/negative based on result.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Note */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Trade"}
          </button>
        </div>
      </form>
    </div>
  );
}