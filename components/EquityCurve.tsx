"use client";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Plan = {
  date: string;
  amount: number;
};

type EquityData = {
  date: string;
  equity: number;
};

export default function EquityCurve({ plans }: { plans: Plan[] }) {
  const data: EquityData[] = useMemo(() => {
    const sorted = [...plans].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sorted.reduce((acc: EquityData[], p) => {
      const lastEquity = acc.length > 0 ? acc[acc.length - 1].equity : 0;
      const newEquity = lastEquity + p.amount;

      // Formatting the date to be slightly cleaner for the X-axis
      acc.push({
        date: new Date(p.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        equity: newEquity,
      });

      return acc;
    }, []);
  }, [plans]);

  return (
    <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl mt-8 shadow-sm">
      <div className="p-5 border-b border-slate-800/80">
        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
          Equity Curve
        </h2>
      </div>

      <div className="p-5">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Custom Gradient for the Area Fill */}
            <defs>
              <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Subtle, horizontal-only grid lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />

            {/* Cleaned up Axes without solid lines */}
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-10}
            />

            {/* Upgraded Tooltip with strictly-typed financial formatting */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#0ea5e9", fontWeight: 600 }}
              labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
              formatter={(value: unknown) => {
                // Safely parse the 'unknown' value to satisfy ESLint and Recharts
                const numericValue = typeof value === "number" ? value : Number(value) || 0;
                
                return [
                  `$${numericValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  "Equity",
                ];
              }}
            />

            {/* Replaced Line with Area for a premium look */}
            <Area
              type="monotone"
              dataKey="equity"
              stroke="#0ea5e9"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEquity)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "#0ea5e9" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}