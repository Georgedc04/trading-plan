"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on form submit
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

   if (res.ok) {
      setShowSuccessPopup(true);
    } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || data.error || "Failed to create account. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Branding Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold bg-linear-to-r from-emerald-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            Join DC Trades
          </h2>
          <p className="text-slate-400 font-medium">
            Create an account to start tracking your edge.
          </p>
        </div>

        {/* Register Card */}
        <form 
          onSubmit={handleRegister} 
          className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl"
        >
          {/* Inline Error Message */}
          {error && (
            <div className="mb-6 p-4 flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm font-medium transition-all">
              <AlertCircle size={18} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Inline Success Message */}
          {success && (
            <div className="mb-6 p-4 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium transition-all">
              <CheckCircle2 size={18} className="shrink-0" />
              <p>Account created successfully! Redirecting to login...</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

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
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Must be at least 6 characters long.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading && !success ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={20} />
                  <span>Success!</span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-900 border border-emerald-700 rounded-xl p-6 w-80 shadow-xl text-center">
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">
              Account Created
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Your account has been created successfully.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}