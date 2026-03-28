"use client";
import { useState } from "react";

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

export default function TradesTable({ plans }: { plans: Plan[] }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Safe check to avoid NaN if plans is empty
  const totalPages = Math.max(1, Math.ceil((plans?.length || 0) / rowsPerPage));

  const paginatedPlans = plans.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl mt-8 shadow-sm">
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
          Trade History
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-900/50 text-slate-400 text-xs font-semibold tracking-wider uppercase border-b border-slate-800/80">
            <tr>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Week</th>
              <th className="px-5 py-4">Day</th>
              <th className="px-5 py-4">Session</th>
              <th className="px-5 py-4">Pair</th>
              <th className="px-5 py-4 text-center">Result</th>
              <th className="px-5 py-4 text-right">Amount</th>
              <th className="px-5 py-4">Note</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50 text-slate-300">
            {paginatedPlans.length > 0 ? (
              paginatedPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="hover:bg-slate-800/30 transition-colors duration-150 ease-in-out group"
                >
                  <td className="px-5 py-3 text-slate-400">
                    {new Date(plan.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3">W{plan.week}</td>
                  <td className="px-5 py-3 capitalize">{plan.day}</td>
                  <td className="px-5 py-3 capitalize">{plan.session}</td>
                  <td className="px-5 py-3 font-medium text-slate-200">
                    {plan.pair}
                  </td>

                  {/* Badges for Results */}
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                        plan.result === "TP"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : plan.result === "SL"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}
                    >
                      {plan.result}
                    </span>
                  </td>

                  {/* Formatted and Right-Aligned Amount */}
                  <td
                    className={`px-5 py-3 text-right font-medium tracking-wide ${
                      plan.amount > 0
                        ? "text-emerald-400"
                        : plan.amount < 0
                        ? "text-rose-400"
                        : "text-slate-400"
                    }`}
                  >
                    {plan.amount > 0 ? "+" : ""}
                    ${Math.abs(plan.amount).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="px-5 py-3 text-slate-500 truncate max-w-50 group-hover:text-slate-300 transition-colors duration-150">
                    {plan.note || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-slate-500">
                  No trades found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Upgraded Pagination Controls */}
      <div className="p-4 border-t border-slate-800/80 flex items-center justify-between text-sm text-slate-400">
        <div>
          Showing <span className="font-medium text-slate-200">{(page - 1) * rowsPerPage + 1}</span> to{" "}
          <span className="font-medium text-slate-200">
            {Math.min(page * rowsPerPage, plans?.length || 0)}
          </span>{" "}
          of <span className="font-medium text-slate-200">{plans?.length || 0}</span> trades
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <div className="px-3 py-1.5 font-medium text-slate-300">
            Page {page} of {totalPages}
          </div>

          <button
            className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}