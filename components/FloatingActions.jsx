'use client'
import { useMemo } from 'react'
import { business } from '@/lib/uiConfig'

export default function FloatingActions(){
  const isWorkHour = useMemo(()=>{
    const d = new Date()
    const day = d.getDay(); const h = d.getHours()
    return [1,2,3,4,5].includes(day) && h>=9 && h<17
  }, [])

  return (
    <div className="fixed z-50 bottom-4 right-4 flex gap-2">
      <a aria-label="Cek Paket" href="/paket" className="fab">Paket</a>
      {isWorkHour && <a aria-label="Telepon CS" href={`tel:${business.phone}`} className="fab">Telepon</a>}
      <a aria-label="WhatsApp" href={`https://wa.me/${business.wa}?text=${encodeURIComponent('Assalamualaikum, saya ingin info paket Umroh 🙏')}`} className="fab">WA</a>
      <style jsx>{`
        .fab{ background:#111;color:#fff;border-radius:999px;padding:10px 14px;box-shadow:0 6px 20px rgba(0,0,0,.2); font-weight:600}
        .fab:hover{opacity:.9}
      `}</style>
    </div>
  )
}
