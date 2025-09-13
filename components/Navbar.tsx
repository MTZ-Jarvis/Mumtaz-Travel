"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Leaf = { href: string; label: string };
type Node = { label: string; children: Leaf[] };
type Item = Leaf | Node;

const navItems: Item[] = [
  { href: "/", label: "Home" },
  {
    label: "Paket Umroh",
    children: [
      { href: "/paket-umroh", label: "Semua Paket" },
      { href: "/paket-umroh/hemat", label: "Umroh Hemat" },
      { href: "/paket-umroh/reguler", label: "Umroh Reguler" },
      { href: "/paket-umroh/vip", label: "Umroh VIP" },
      { href: "/paket-umroh/turki", label: "Umroh + Turki" },
      { href: "/paket-umroh/dubai", label: "Umroh + Dubai" },
    ],
  },
  { href: "/tabungan", label: "Program Tabungan" },
  {
    label: "Wisata Halal",
    children: [
      { href: "/wisata-halal/indonesia", label: "Indonesia" },
      { href: "/wisata-halal/asia", label: "Asia" },
      { href: "/wisata-halal/middle-east", label: "Middle East" },
      { href: "/wisata-halal/europe", label: "Europe" },
      { href: "/wisata-halal/custom", label: "Custom Trip" },
    ],
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  {
    label: "Why Us?",
    children: [
      { href: "/profile", label: "Tentang Kami" },
      { href: "/kontak", label: "Hubungi Kami" },
      { href: "#", label: "Resmi PPIU Kemenag" },
      { href: "#", label: "Terdaftar ASTINDO & SAPUHI" },
      { href: "#", label: "Transparansi biaya & layanan" },
      { href: "#", label: "Pendampingan end-to-end" },
    ],
  },
];

const isNode = (it: Item): it is Node =>
  Array.isArray((it as any).children) && (it as any).children.length > 0;

function Pill({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={[
        "px-3 py-2 rounded-xl text-[13px] leading-none",
        "border transition-colors select-none",
        "flex items-center gap-2",
        active
          ? "bg-[var(--brand-accent)] text-[var(--brand-primary-900)] border-[var(--brand-accent)]"
          : "text-white/95 border-white/30 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function NavLink({ href, label }: Leaf) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
  return (
    <Link href={href} className="inline-block whitespace-nowrap">
      <Pill active={active}>{label}</Pill>
    </Link>
  );
}

function NavDropdown({ label, items = [] as Leaf[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = items.some((it) => pathname && pathname.startsWith(it.href));

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center whitespace-nowrap"
        aria-expanded={open}
      >
        <Pill active={active}>
          <span>{label}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Pill>
      </button>

      {open && items.length > 0 && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/20 bg-[color:var(--brand-primary-700)]/95 backdrop-blur shadow-lg">
          {items.map((it, idx) => (
            <Link key={it.href + idx} href={it.href} className="block px-4 py-3 text-sm text-white/95 hover:bg-white/10" onClick={() => setOpen(false)}>
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <nav className="w-full" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 min-w-0">
              <Image src="/logo-mumtaz.png" alt="Mumtaz" width={56} height={56} className="h-14 w-14 rounded-full object-contain" priority />
              <div className="leading-tight">
                <p className="text-lg font-bold text-[var(--brand-accent)]">MUMTAZ</p>
                <p className="text-[13px] text-white">Madaniah Utama</p>
              </div>
            </Link>

            {/* Menu desktop inline semua */}
            <div className="hidden md:flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar">
              {navItems.map((it) =>
                isNode(it) ? (
                  <NavDropdown key={it.label} label={it.label} items={it.children} />
                ) : (
                  <NavLink key={(it as Leaf).href} {...(it as Leaf)} />
                )
              )}
            </div>

            {/* Burger mobile */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-white hover:opacity-90"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle Menu"
              aria-expanded={open}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {open ? <path d="M18 6 6 18M6 6l12 12" /> : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
              </svg>
            </button>
          </div>

          {/* Drawer mobile */}
          {open && (
            <div className="md:hidden pb-3">
              <div className="flex flex-col gap-2">
                {navItems.map((it, idx) =>
                  isNode(it) ? (
                    <details key={"dd-"+idx} className="rounded-xl border border-white/20">
                      <summary className="px-4 py-3 cursor-pointer text-white flex justify-between items-center">
                        {it.label}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-2 shrink-0">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </summary>
                      <div className="flex flex-col">
                        {it.children.map((c, cIdx) => (
                          <Link key={c.href + cIdx} href={c.href} className="px-4 py-3 text-white/95 hover:bg-white/10" onClick={() => setOpen(false)}>
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link key={(it as Leaf).href} href={(it as Leaf).href} className="px-4 py-3 rounded-xl text-[14px] text-white border border-white/20 hover:bg-white/10" onClick={() => setOpen(false)}>
                      {(it as Leaf).label}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
