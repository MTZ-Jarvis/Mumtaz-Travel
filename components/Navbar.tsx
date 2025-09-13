"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const PRIMARY_LINKS = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#paket", label: "Paket", id: "paket" },
  { href: "#tabungan", label: "Tabungan", id: "tabungan" },
] as const;

const OVERFLOW_LINKS = [
  { href: "#corporate", label: "Corporate", id: "corporate" },
  { href: "#faq", label: "FAQ", id: "faq" },
  { href: "#tentang", label: "Tentang", id: "tentang" },
] as const;

const WA_CTA = {
  href: "https://wa.me/62895600000101?text=Assalamu'alaikum%2C%20saya%20ingin%20konsultasi%20paket%20Umroh%20Mumtaz%20Travel.",
  label: "Konsultasi",
} as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const all = [...PRIMARY_LINKS, ...OVERFLOW_LINKS];
      const offset = 120;
      const rectTops = all.map((s) => {
        const el = document.getElementById(s.id || "");
        const rect = el ? el.getBoundingClientRect() : { top: Infinity };
        return rect.top;
      });
      let current = all[0].id;
      for (let i = 0; i < rectTops.length; i++) {
        if (rectTops[i] - offset <= 0) current = all[i].id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const baseLink = "px-3 py-2 rounded-xl text-sm transition-colors ";
  const activeLink = "bg-white/80 text-gray-900 shadow-sm";
  const idleLink = "text-white/80 hover:text-white hover:bg-white/10";

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur bg-gray-900/60 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="#home" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-amber-500 flex items-center justify-center font-bold text-gray-900">
              M
            </div>
            <span className="font-semibold text-white tracking-wide">Mumtaz Travel</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {PRIMARY_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={baseLink + (active === item.id ? activeLink : idleLink)}
              >
                {item.label}
              </a>
            ))}
            <div className="relative">
              <button
                onClick={() => setOverflowOpen((v) => !v)}
                onBlur={() => setTimeout(() => setOverflowOpen(false), 150)}
                className={
                  baseLink +
                  (OVERFLOW_LINKS.some((l) => l.id === active) ? activeLink : idleLink) +
                  " flex items-center gap-1"
                }
              >
                Lainnya <ChevronDown className="h-4 w-4" />
              </button>
              {overflowOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white/95 shadow-lg ring-1 ring-black/5 backdrop-blur p-2">
                  {OVERFLOW_LINKS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOverflowOpen(false)}
                      className={`block px-3 py-2 rounded-xl text-sm text-gray-800 hover:bg-gray-100 ${
                        active === item.id ? "bg-gray-100" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href={WA_CTA.href}
              target="_blank"
              className="ml-3 inline-flex items-center justify-center rounded-2xl border border-amber-400 bg-amber-400/90 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              {WA_CTA.label}
            </a>
          </div>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="space-y-2 rounded-2xl bg-white/95 p-3 shadow-md backdrop-blur">
              {[...PRIMARY_LINKS, ...OVERFLOW_LINKS].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block ${baseLink} ${
                    active === item.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={WA_CTA.href}
                target="_blank"
                className="block text-center rounded-2xl border border-amber-400 bg-amber-400/90 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300"
              >
                {WA_CTA.label}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
