"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md opacity-40 hover:opacity-100 hover:text-yellow-400 hover:border-yellow-500/40 transition-all duration-300"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>LAB</span>
    </Link>
  );
}
