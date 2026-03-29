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

export default function TradesTable({
  plans,
  setPlans,
}: {
  plans: Plan[];
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
}) {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const rowsPerPage = 10;

  const totalPages = Math.max(
    1,
    Math.ceil((plans?.length || 0) / rowsPerPage)
  );

  const paginatedPlans = plans.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleDelete = async () => {
    if (!deleteId) return;

    const res = await fetch("/api/plan/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: deleteId }),
    });

    if (res.ok) {
      setPlans((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } else {
      alert("Failed to delete trade");
    }
  };

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
              <th className="px-5 py-4 text-center">Delete</th>
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

                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => setDeleteId(plan.id)}
                      className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-5 py-8 text-center text-slate-500">
                  No trades found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-800/80 flex items-center justify-between text-sm text-slate-400">
        <div>
          Showing{" "}
          <span className="font-medium text-slate-200">
            {(page - 1) * rowsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-slate-200">
            {Math.min(page * rowsPerPage, plans?.length || 0)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-200">
            {plans?.length || 0}
          </span>{" "}
          trades
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

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-80 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Trade
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Are you sure you want to delete this trade?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}