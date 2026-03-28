import Link from "next/link";
import { ShieldCheck, Info, Lock, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#07090D] text-slate-300 font-sans p-6 md:p-20">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8">
            <ArrowLeft size={16} />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Calculator</span>
          </Link>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Legal & <span className="text-sky-500">Risk Policy</span>
          </h1>
          <p className="text-slate-500 text-sm">Last Updated: January 2026</p>
        </header>

        {/* 1. High Risk Warning */}
        <section className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <ShieldCheck size={24} />
            <h2 className="text-lg font-bold uppercase tracking-tight">Forex Risk Disclosure</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. 
            The high degree of leverage can work against you as well as for you. Before deciding to invest in foreign exchange, 
            you should carefully consider your investment objectives, level of experience, and risk appetite.
          </p>
        </section>

        {/* 2. Privacy & Data Policy */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-sky-400">
            <Lock size={20} />
            <h2 className="text-lg font-bold uppercase tracking-tight">Privacy & Data Security</h2>
          </div>
          <p className="text-sm leading-relaxed">
            <strong>Zero-Knowledge Policy:</strong> DC Trades does not collect, store, or share any personal 
            information, financial data, or trading history. All calculations are performed locally within 
            your browser session. 
          </p>
          <ul className="list-disc pl-5 text-sm space-y-2 text-slate-400">
            <li>No account registration required.</li>
            <li>No cookies used for tracking.</li>
            <li>No integration with third-party financial institutions.</li>
          </ul>
        </section>

        {/* 3. Not Financial Advice */}
        <section className="space-y-4 border-t border-slate-800 pt-8">
          <div className="flex items-center gap-3 text-slate-400">
            <Info size={20} />
            <h2 className="text-lg font-bold uppercase tracking-tight">Educational Purpose</h2>
          </div>
          <p className="text-sm leading-relaxed italic">
            The DC Trades calculator is a mathematical tool designed for educational and informational purposes only. 
            The results provided are estimates based on user input and market rates. DC Trades is not responsible 
            for any trading losses incurred through the use of this software.
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-12 text-center border-t border-slate-900">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600">
            &copy; 2026 DC TRADES • PRECISION TRADING ENGINE
          </p>
        </footer>
      </div>
    </div>
  );
}