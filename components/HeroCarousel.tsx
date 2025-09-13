"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";

const WA =
  "https://wa.me/62895600000101?text=Assalamu'alaikum%2C%20saya%20ingin%20konsultasi%20paket%20Umroh%20Mumtaz%20Madaniah%20Utama.";

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bullets: string[];
};

const slides: Slide[] = [
  {
    id: "integritas",
    title: "Amanah Selalu di Hati",
    subtitle: "Resmi PPIU Kemenag • ASTINDO • SAPUHI",
    image: "/hero1.jpg",
    bullets: ["Transparansi biaya", "Pendampingan end-to-end", "Komitmen amanah"],
  },
  {
    id: "tabungan",
    title: "Program Tabungan Umroh",
    subtitle: "Cicil ringan • Setoran fleksibel • Terintegrasi bank syariah",
    image: "/hero2.jpg",
    bullets: ["Monitoring transparan", "Pilihan tenor variatif", "Berangkat nyaman"],
  },
  {
    id: "corporate",
    title: "Umroh Korporasi",
    subtitle: "Rombongan perusahaan / instansi",
    image: "/hero3.jpg",
    bullets: ["Harga grup kompetitif", "Custom itinerary & branding", "Pendampingan VIP"],
  },
  {
    id: "wisata",
    title: "Wisata Halal",
    subtitle: "Jelajah dunia tetap syariah",
    image: "/hero4.jpg",
    bullets: ["Hotel & kuliner halal", "Guide berpengalaman", "Paket Umroh + Wisata"],
  },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((p) => (p + n + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(() => go(1), 8000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section id="home" className="relative bg-white">
      {/* Image background */}
      <div className="absolute inset-0">
        <img
          src={s.image}
          alt={s.title}
          className="h-full w-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Title & subtitle */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#6A1D1B]">{s.title}</h1>
        <p className="mt-3 text-lg text-gray-700">{s.subtitle}</p>

        {/* Bullets */}
        <ul className="mt-5 space-y-2">
          {s.bullets.map((b, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-800">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
              {b}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37] bg-[#D4AF37] px-5 py-2.5 font-semibold text-[#6A1D1B] hover:bg-[#c7a031]"
          >
            <Phone className="h-4 w-4" /> Konsultasi Gratis
          </a>
          <a
            href="#paket"
            className="inline-flex items-center justify-center rounded-xl border border-[#6A1D1B]/20 px-5 py-2.5 font-semibold text-[#6A1D1B] hover:bg-[#6A1D1B]/5"
          >
            Lihat Paket
          </a>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => go(-1)}
          className="m-3 rounded-full bg-white/70 p-2 shadow hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5 text-[#6A1D1B]" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={() => go(1)}
          className="m-3 rounded-full bg-white/70 p-2 shadow hover:bg-white"
        >
          <ChevronRight className="h-5 w-5 text-[#6A1D1B]" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full ${
              i === idx ? "bg-[#6A1D1B]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
