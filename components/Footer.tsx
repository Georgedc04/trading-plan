"use client";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-360 mx-auto px-4 py-10 text-center">
        
        

        <p className="text-slate-400 mt-2 text-sm font-medium tracking-wide">
          <Logo  />
        </p>

       
        {/* Ecosystem Tools & Legal */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4 text-sm text-slate-500">
          <a 
            href="https://dctrades.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 transition-colors"
          >
            DC Trading Journal
          </a>
          <a 
            href="https://calculator.dctrades.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 transition-colors"
          >
            Calculator
          </a>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">
            Terms & Conditions
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-slate-600 text-xs mt-8">
          © {new Date().getFullYear()} DC Trades. All rights reserved.
        </p>
      </div>
    </footer>
  );
}