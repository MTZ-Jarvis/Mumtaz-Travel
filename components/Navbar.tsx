"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Cinzel, Cormorant_Garamond } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700","900"] });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500","600"] });

type MenuItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const MAROON = "#681010";
  const MAROON_SCROLL = "#7a1414";
  const GOLD = "#D4AF37";
  const navBg = scrolled ? MAROON_SCROLL : MAROON;

  const menu: MenuItem[] = [
    { href: "/", label: "Home" },
    {
      href: "/paket",
      label: "Paket Umroh",
      children: [
        { href: "/paket", label: "Semua Paket" },
        { href: "/paket/umroh-hemat", label: "Umroh Hemat" },
        { href: "/paket/umroh-reguler", label: "Umroh Reguler" },
        { href: "/paket/umroh-vip", label: "Umroh VIP" },
        { href: "/paket/umroh-plus-wisata", label: "Umroh + Wisata" },
      ],
    },
    { href: "/tabungan", label: "Program Tabungan" },
    {
      href: "/wisata",
      label: "Wisata Halal",
      children: [
        { href: "/wisata/indonesia", label: "Indonesia" },
        { href: "/wisata/asia", label: "Asia" },
        { href: "/wisata/middle-east", label: "Middle East" },
        { href: "/wisata/europe", label: "Europe" },
      ],
    },
    { href: "/gallery", label: "Gallery" },
    { href: "/faq", label: "FAQ" },
    { href: "/whyus", label: "Why Us?" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`text-white fixed w-full top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-lg" : "shadow-md"}`}
      style={{ backgroundColor: navBg }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 md:gap-4 select-none">
          <div className="relative h-20 w-20">
            <Image
              src="/logo-mumtaz.png"
              alt="Logo Mumtaz"
              width={80}
              height={80}
              className="object-contain rounded-full"
              priority
            />
          </div>
          <div className="leading-tight">
            <span
              className={`${cinzel.className} uppercase tracking-wide font-extrabold text-[20px] md:text-[24px]`}
              style={{ color: GOLD, textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
            >
              MUMTAZ
            </span>
            <span
              className={`${cormorant.className} italic block text-[12px] md:text-sm`}
              style={{ color: "#E5E5E5", letterSpacing: "0.05em" }}
            >
              Madaniah Utama
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-2 font-medium">
          {menu.map((item) => {
            const active = isActive(item.href);
            const hasChildren = !!item.children?.length;
            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 py-1.5 rounded-full border inline-flex items-center gap-1 transition"
                  style={{
                    borderColor: active ? GOLD : "rgba(255,255,255,0.2)",
                    backgroundColor: active ? GOLD : "transparent",
                    color: active ? MAROON : "white",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {item.label}
                  {hasChildren && <ChevronDown size={16} className="opacity-90" />}
                </Link>
                {hasChildren && (
                  <div
                    className="invisible opacity-0 group-hover:visible group-hover:opacity-100
                               before:absolute before:-top-2 before:left-0 before:w-full before:h-2
                               absolute left-0 mt-0.5 min-w-[240px] rounded-xl border bg-white shadow-xl
                               transition-opacity"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <ul className="py-2">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2.5 text-[15px] hover:bg-gray-100 transition"
                            style={{ color: MAROON }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => { setIsOpen(!isOpen); setOpenDropdown(null); }} className="md:hidden focus:outline-none">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-3 pb-3 relative z-[60]" style={{ backgroundColor: navBg }}>
          <ul className="grid gap-3 font-medium">
            {menu.map((item) => {
              const hasChildren = !!item.children?.length;
              const opened = openDropdown === item.href;
              const headerCls =
                "w-full flex items-center justify-between rounded-2xl px-4 py-3 border cursor-pointer select-none active:scale-[.99] active:bg-white/10";
              const headerStyle = { borderColor: "rgba(255,255,255,0.18)", backgroundColor: "rgba(255,255,255,0.05)" };

              return (
                <li key={item.href}>
                  {hasChildren ? (
                    <button
                      type="button"
                      className={headerCls}
                      style={headerStyle}
                      onClick={() => setOpenDropdown(opened ? null : item.href)}
                    >
                      <span className="text-left">{item.label}</span>
                      <ChevronDown size={18} className={`transition ${opened ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link href={item.href} onClick={() => setIsOpen(false)} className={headerCls} style={headerStyle}>
                      <span className="text-left">{item.label}</span>
                    </Link>
                  )}
                  {hasChildren && opened && (
                    <div
                      className="mt-2 rounded-2xl border relative z-[61] max-h-80 overflow-y-auto pointer-events-auto"
                      style={{ borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                      <ul className="py-2">
                        {item.children!.map((child, idx) => (
                          <li key={child.href} className={`px-4 ${idx === 0 ? "" : "border-t"}`}
                              style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                            <Link
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="block w-full py-3.5 text-[16px] active:bg-white/10 rounded-lg"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
