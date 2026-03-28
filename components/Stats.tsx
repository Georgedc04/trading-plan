"use client";
import { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  BarChart3,
  Trophy,
} from "lucide-react";

type Plan = {
  date: string;
  result: string;
  amount: number;
  day: string;
  session: string;
};

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "positive" | "negative" | "neutral" | "highlight";
};

// Upgraded StatCard with subtle, professional hover states and color coding
function StatCard({ title, value, icon, trend = "neutral" }: StatCardProps) {
  const colors = {
    positive: "text-emerald-400",
    negative: "text-rose-400",
    neutral: "text-slate-400",
    highlight: "text-indigo-400",
  };

  const interactiveGlow = {
    positive: "hover:border-emerald-500/40 hover:bg-emerald-500/[0.03]",
    negative: "hover:border-rose-500/40 hover:bg-rose-500/[0.03]",
    neutral: "hover:border-slate-500/40 hover:bg-slate-500/[0.03]",
    highlight: "hover:border-indigo-500/40 hover:bg-indigo-500/[0.03]",
  };

  return (
    <div
      className={`group bg-[#0f172a] border border-slate-800/80 p-5 rounded-xl shadow-sm transition-all duration-300 ease-in-out cursor-default ${interactiveGlow[trend]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
          {title}
        </div>
        <div
          className={`${colors[trend]} bg-slate-800/40 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
        {value}
      </div>
    </div>
  );
}

export default function Stats({ plans }: { plans: Plan[] }) {
  const stats = useMemo(() => {
    let totalTP = 0;
    let totalSL = 0;
    let totalProfit = 0;
    let thisWeekProfit = 0;
    let thisMonthProfit = 0;

    const dayProfit: Record<string, number> = {};
    const sessionProfit: Record<string, number> = {};

    const now = new Date();
    const weekStart = new Date();
    weekStart.setDate(now.getDate() - now.getDay());

    for (const p of plans) {
      const tradeDate = new Date(p.date);

      if (p.result === "TP") totalTP++;
      if (p.result === "SL") totalSL++;

      totalProfit += p.amount;

      if (tradeDate >= weekStart) {
        thisWeekProfit += p.amount;
      }

      if (
        tradeDate.getMonth() === now.getMonth() &&
        tradeDate.getFullYear() === now.getFullYear()
      ) {
        thisMonthProfit += p.amount;
      }

      dayProfit[p.day] = (dayProfit[p.day] || 0) + p.amount;
      sessionProfit[p.session] =
        (sessionProfit[p.session] || 0) + p.amount;
    }

    const totalTrades = totalTP + totalSL;
    const winRate = totalTrades
      ? ((totalTP / totalTrades) * 100).toFixed(1)
      : "0";

    const bestDay =
      Object.keys(dayProfit).length > 0
        ? Object.entries(dayProfit).sort((a, b) => b[1] - a[1])[0][0]
        : "-";

    const bestSession =
      Object.keys(sessionProfit).length > 0
        ? Object.entries(sessionProfit).sort((a, b) => b[1] - a[1])[0][0]
        : "-";

    return {
      totalProfit,
      winRate,
      totalTP,
      totalSL,
      thisWeekProfit,
      thisMonthProfit,
      bestDay,
      bestSession,
    };
  }, [plans]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
          Performance Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          title="Total Profit"
          value={`$${stats.totalProfit.toLocaleString()}`}
          icon={<TrendingUp size={20} />}
          trend="positive"
        />
        <StatCard
          title="Win Rate"
          value={`${stats.winRate}%`}
          icon={<Target size={20} />}
          trend="highlight"
        />
        <StatCard
          title="Total TP"
          value={stats.totalTP}
          icon={<TrendingUp size={20} />}
          trend="positive"
        />
        <StatCard
          title="Total SL"
          value={stats.totalSL}
          icon={<TrendingDown size={20} />}
          trend="negative"
        />
        <StatCard
          title="This Week"
          value={`$${stats.thisWeekProfit.toLocaleString()}`}
          icon={<Calendar size={20} />}
          trend="positive"
        />
        <StatCard
          title="This Month"
          value={`$${stats.thisMonthProfit.toLocaleString()}`}
          icon={<BarChart3 size={20} />}
          trend="positive"
        />
        <StatCard
          title="Best Day"
          value={stats.bestDay}
          icon={<Trophy size={20} />}
          trend="neutral"
        />
        <StatCard
          title="Best Session"
          value={stats.bestSession}
          icon={<Trophy size={20} />}
          trend="neutral"
        />
      </div>
    </div>
  );
}