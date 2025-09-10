'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? 'shadow-sm' : ''}`}>
      <div style={{backgroundColor:'#6a0e0e', color:'#fff'}}>
        <nav className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between" role="navigation" aria-label="Main">
          {/* Logo + Nama */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-mumtaz.png"
              alt="Mumtaz Madaniah Utama"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
            <span className="font-semibold text-lg sm:text-xl tracking-wide">
              Mumtaz Madaniah Utama
            </span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-2 text-sm lg:text-base">
            <Link href="/paket" className={`nav-a ${isActive('/paket') ? 'active' : ''}`}>Paket Umroh</Link>
            <Link href="/program-tabungan" className={`nav-a ${isActive('/program-tabungan') ? 'active' : ''}`}>Program Tabungan</Link>
            <Link href="/umroh-korporasi" className={`nav-a ${isActive('/umroh-korporasi') ? 'active' : ''}`}>Umroh Korporasi</Link>
            <Link href="/wisata-halal" className={`nav-a ${isActive('/wisata-halal') ? 'active' : ''}`}>Wisata Halal</Link>
            <div className="relative" onMouseLeave={() => setOpen(false)}>
              <button className="nav-a inline-flex items-center gap-1" aria-haspopup="menu" aria-expanded={open} onMouseEnter={()=>setOpen(true)} onClick={()=>setOpen(v=>!v)}>
                Umroh + 
                <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden><path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white text-black shadow-md p-2 grid" role="menu">
                  <Link className="drop" href="/umroh-plus/dubai">Umroh + Dubai</Link>
                  <Link className="drop" href="/umroh-plus/turkey">Umroh + Turkey</Link>
                  <Link className="drop" href="/umroh-plus/qatar">Umroh + Qatar</Link>
                  <Link className="drop" href="/umroh-plus/egypt">Umroh + Egypt</Link>
                  <Link className="drop" href="/umroh-plus">Lihat Semua</Link>
                </div>
              )}
            </div>
            <Link href="/faq" className={`nav-a ${isActive('/faq') ? 'active' : ''}`}>FAQ</Link>
            <Link href="/tentang" className={`nav-a ${isActive('/tentang') ? 'active' : ''}`}>Tentang</Link>
            <Link href="/kontak" className="btn ml-1">Kontak</Link>
          </div>

          {/* Menu mobile */}
          <details className="md:hidden">
            <summary className="cursor-pointer select-none">Menu</summary>
            <div className="mt-2 grid gap-2 bg-white text-black rounded-xl shadow p-2">
              <Link href="/paket" className="drop">Paket Umroh</Link>
              <Link href="/program-tabungan" className="drop">Program Tabungan</Link>
              <Link href="/umroh-korporasi" className="drop">Umroh Korporasi</Link>
              <Link href="/wisata-halal" className="drop">Wisata Halal</Link>
              <Link href="/umroh-plus" className="drop">Umroh +</Link>
              <Link href="/faq" className="drop">FAQ</Link>
              <Link href="/tentang" className="drop">Tentang</Link>
              <Link href="/kontak" className="btn">Kontak</Link>
            </div>
          </details>
        </nav>
      </div>

      <style jsx>{`
        .nav-a{ padding:8px 12px; border-radius:10px; color:#fff; }
        .nav-a:hover{ background:rgba(255,255,255,.12); }
        .nav-a.active{ background:#4f0a0a; font-weight:600; }
        .drop{ padding:8px 10px; border-radius:8px; }
        .drop:hover{ background:rgba(0,0,0,.06); }
      `}</style>
    </header>
  )
}
