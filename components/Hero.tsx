"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/hero-1.jpg",
    title: "Umroh Hemat & Nyaman",
    desc: "Pilihan terbaik untuk ibadah dengan harga terjangkau dan layanan berkualitas.",
  },
  {
    src: "/hero-2.jpg",
    title: "Umroh VIP & Premium",
    desc: "Nikmati pengalaman eksklusif dengan fasilitas terbaik untuk perjalanan ibadah Anda.",
  },
  {
    src: "/hero-3.jpg",
    title: "Umroh + Wisata",
    desc: "Gabungkan ibadah dan wisata halal di destinasi populer dunia.",
  },
  {
    src: "/hero-4.jpg",
    title: "Wisata Halal Global",
    desc: "Temukan destinasi halal di Asia, Eropa, dan Timur Tengah bersama Mumtaz.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image src={slide.src} alt={`Slide ${idx + 1}`} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          {slides[current].title} <span className="text-yellow-400">Mumtaz</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-100 drop-shadow">
          {slides[current].desc}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://wa.me/62895600000101"
            target="_blank"
            className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition shadow-lg"
          >
            Konsultasi via WhatsApp
          </Link>
          <Link
            href="/paket"
            className="px-6 py-3 rounded-xl border border-white font-semibold hover:bg-white/10 transition"
          >
            Lihat Paket
          </Link>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-yellow-400" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
