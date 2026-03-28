"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Loader2, AlertCircle } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on enter key
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId); // مهم - User ID saved

        // Use Next.js router for instant transition instead of window.location
        router.push("/dashboard"); 
      } else {
        // Display backend error message or generic fallback
        setError(data.message || data.error || "Invalid email or password.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Branding Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            DC Trades
          </h2>
          <p className="text-slate-400 font-medium">
            Sign in to access your trading dashboard
          </p>
        </div>

        {/* Login Card */}
        <form 
          onSubmit={handleLogin} 
          className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl"
        >
          {/* Inline Error Message */}
          {error && (
            <div className="mb-6 p-4 flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm font-medium">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}