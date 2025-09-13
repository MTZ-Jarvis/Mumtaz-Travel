"use client";
import { PiggyBank, Phone } from "lucide-react";

const WA =
  "https://wa.me/62895600000101?text=Assalamu'alaikum%2C%20saya%20tertarik%20dengan%20Program%20Tabungan%20Umroh%20Mumtaz%20Madaniah%20Utama.";

export default function Hero2() {
  return (
    <section id="tabungan" className="relative overflow-hidden bg-[#FDFBF6]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#FDFBF6] to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-wider text-[#6A1D1B] font-semibold">
          Program Tabungan Umroh
        </p>

        {/* Title */}
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#1c1c1c]">
          Cicil Ringan, Berangkat Nyaman
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-lg text-gray-700 max-w-2xl">
          Setoran fleksibel, transparan, dan terintegrasi dengan bank syariah rekanan.
        </p>

        {/* Bullets */}
        <ul className="mt-5 space-y-2 text-gray-800">
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Setoran mulai
            terjangkau
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Monitoring
            transparan
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Pilihan tenor
            variatif
          </li>
        </ul>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#tabungan-form"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37] bg-[#D4AF37] px-5 py-2.5 font-semibold text-[#6A1D1B] hover:bg-[#c7a031]"
          >
            <PiggyBank className="h-4 w-4" /> Mulai Nabung
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#6A1D1B]/20 px-5 py-2.5 font-semibold text-[#6A1D1B] hover:bg-[#6A1D1B]/5"
          >
            <Phone className="h-4 w-4" /> Tanya Admin
          </a>
        </div>
      </div>
    </section>
  );
}
