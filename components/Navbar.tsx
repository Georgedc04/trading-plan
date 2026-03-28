"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Check login directly
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Add Trade", path: "/add-plan", icon: PlusCircle },
  ];

  return (
    <nav className="w-full border-b border-slate-800/80 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0 flex items-center">
          <Logo />
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          {/* Logged In */}
          {isLoggedIn && (
            <>
              <div className="flex items-center gap-1 sm:gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "text-sky-400 bg-sky-500/10"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="hidden sm:block">{link.name}</span>

                      {isActive && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute inset-0 rounded-lg border border-sky-500/20 pointer-events-none"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:block">Logout</span>
              </button>
            </>
          )}

          {/* Not Logged In */}
          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <LogIn size={18} />
                <span className="hidden sm:block">Login</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <UserPlus size={18} />
                <span className="hidden sm:block">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}