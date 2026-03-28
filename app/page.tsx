"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      setTimeout(() => setIsChecking(false), 300);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] bg-grid overflow-hidden relative selection:bg-emerald-500/30">
      {/* Dynamic Background Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
        {/* Navigation / Header */}
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
               <TrendingUp size={18} className="text-slate-950" />
            </div>
            TRADE<span className="text-emerald-500">FLOW</span>
          </div>
          <Link href="/login" className="text-sm font-medium hover:text-emerald-400 transition-colors">
            Member Sign In
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              MARKETS LIVE: +2.45% BTC/USD
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              MASTER <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                THE EDGE.
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
              High-frequency analytics for the modern trader. Track every move, analyze patterns, and improve your PNL.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 text-slate-950 font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-[1.02] active:scale-[0.98] glow-up"
              >
                Start Trading Now
                <ArrowRight size={20} />
              </Link>
              <button className="flex items-center justify-center px-8 py-4 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 font-semibold text-lg backdrop-blur-sm hover:bg-slate-800 transition-all">
                View Live Demo
              </button>
            </div>
          </div>

          {/* Interesting Visual Element: Mock Terminal/Chart */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-panel rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="text-xs font-mono text-slate-500 italic">terminal v4.02</div>
              </div>
              
              <div className="space-y-4">
                <div className="h-4 bg-slate-800/50 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-800/50 rounded w-full animate-pulse delay-75" />
                <div className="h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-end p-2 gap-1">
                  {[40, 70, 45, 90, 65, 80, 50, 95, 100].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-emerald-500/40 rounded-t-sm" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-slate-900/50 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Execution Speed</div>
                    <div className="text-emerald-400 font-mono text-lg">12ms</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900/50 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Success Rate</div>
                    <div className="text-blue-400 font-mono text-lg">94.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}