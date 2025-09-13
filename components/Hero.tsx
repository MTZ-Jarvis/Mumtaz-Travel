"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  ctas?: { label: string; href: string }[];
  image?: string;
};

const slides: Slide[] = [
  {
    id: "integritas",
    eyebrow: "Mumtaz Madaniah Utama — Resmi & Terpercaya",
    title: "Amanah Selalu di Hati",
    subtitle: "Berizin resmi PPIU Kemenag, terintegrasi dengan mitra terpercaya.",
    bullets: [
      "Izin PPIU: 02201013519080004",
      "Terdaftar ASTINDO & SAPUHI",
      "Pendampingan end-to-end",
      "Transparansi biaya & layanan",
    ],
    ctas: [{ label: "Lihat Paket", href: "#paket" }],
    image: "/hero-1.jpg",
  },
  {
    id: "tabungan",
    eyebrow: "Program Tabungan Umroh",
    title: "Cicil Ringan, Berangkat Nyaman",
    subtitle: "Terintegrasi bank rekanan, setoran fleksibel.",
    bullets: ["Setoran terjangkau", "Monitoring transparan", "Tenor variatif"],
    ctas: [{ label: "Mulai Nabung", href: "#tabungan" }],
    image: "/hero-2.jpg",
  },
  {
    id: "corporate",
    eyebrow: "Umroh Korporasi",
    title: "Rombongan Perusahaan / Instansi",
    subtitle: "Kustom itinerary, MoU, & laporan pertanggungjawaban.",
    bullets: ["Harga grup kompetitif", "Pendampingan VIP", "Branding perusahaan"],
    ctas: [{ label: "Ajukan Proposal", href: "#corporate" }],
    image: "/hero-3.jpg",
  },
  {
    id: "wisata",
    eyebrow: "Wisata Halal",
    title: "Jelajah Dunia, Tetap Syariah",
    subtitle: "Turkey • Dubai • Eropa • Asia dengan kurasi halal.",
    bullets: ["Hotel & kuliner halal", "Guide berpengalaman", "Umroh + Wisata"],
    ctas: [{ label: "Lihat Paket Wisata", href: "#wisata" }],
    image: "/hero-4.jpg",
  },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((p) => (p + n + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section id="home" className="relative">
      {s.image && (
        <div
          className="absolute inset-0 -z-10 bg-black"
          style={{ backgroundImage:`url(${s.image})`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.18 }}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/85 to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-2 gap-6 items-center min-h-[56vh] md:min-h-[62vh]">
          <div>
            {s.eyebrow && (
              <p className="text-xs uppercase tracking-wider text-[#6A1D1B] font-semibold">{s.eyebrow}</p>
            )}
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-[#1c1c1c]">{s.title}</h1>
            {s.subtitle && <p className="mt-3 text-lg text-gray-700">{s.subtitle}</p>}
            {s.bullets && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-gray-800">
                {s.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#D4AF37]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {s.ctas?.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="inline-flex items-center justify-center rounded-xl border border-[#6A1D1B]/20 px-5 py-2.5 font-semibold text-[#6A1D1B] hover:bg-[#6A1D1B]/5"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="aspect-[4/3] w-full rounded-2xl bg-white/60 border border-black/5 shadow-sm overflow-hidden flex items-center justify-center">
              <span className="text-sm text-gray-500">Gambar slide {i + 1} (placeholder)</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Prev" className="rounded-full p-2 border hover:bg-gray-50">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-[#1c1c1c]" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next" className="rounded-full p-2 border hover:bg-gray-50">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
