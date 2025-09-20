"use client";
import { Bodoni_Moda, Prata } from "next/font/google";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400","700"] });
const prata  = Prata({ subsets: ["latin"], weight: ["400"] });

export default function Brand() {
  return (
    <div className="flex items-center gap-1">
      {/* Logo lebih besar (64px) */}
      <img
        src="/brand/logo.png"
        alt="Mumtaz Logo"
        width={72}
        height={72}
        style={{ objectFit: "contain", display: "block" }}
      />

      {/* Teks brand */}
      <div className="flex flex-col leading-tight">
        <span
          className={`${bodoni.className} text-xl md:text-2xl font-extrabold tracking-wide`}
          style={{ color: "#d4af37", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          MUMTAZ
        </span>
        {/* Non-breaking + no-wrap supaya "Madaniah Utama" tidak patah */}
        <span className={`${prata.className} text-xs md:text-sm opacity-95 whitespace-nowrap`}>
          {"Madaniah\u00A0Utama"}
        </span>
      </div>
    </div>
  );
}
