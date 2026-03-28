"use client";
import Link from "next/link";

export default function Logo({ }: { collapsed?: boolean }) {
  return (
    <Link href="/" className="no-underline">
      <div
        className={`font-bold font-[Pacifico] bg-linear-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent text-xl text-center`}
      >
        DC Trades
      </div>
    </Link>
  );
}