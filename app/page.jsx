import Link from 'next/link'

function Card({title, desc, href, cta}){
  return (
    <div className="rounded-2xl border p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
      <Link href={href} className="btn mt-4 inline-block">{cta}</Link>
    </div>
  )
}

export default function HomePage(){
  return (
    <div className="space-y-12">
      <section className="grid gap-3">
        <div className="rounded-2xl bg-gray-100 p-8">
          <h1 className="text-2xl font-bold">Umroh Bersama Mumtaz</h1>
          <p className="mt-1 text-gray-700">Ibadah tenang, layanan profesional.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/paket" className="btn">Daftar Sekarang</Link>
            <Link href="/program-tabungan" className="navlink">Mulai Nabung</Link>
          </div>
        </div>
        <div className="rounded-2xl bg-gray-100 p-8">
          <h2 className="text-xl font-semibold">Promo Countdown</h2>
          <p className="text-gray-700">Diskon terbatas untuk keberangkatan tertentu.</p>
          <Link href="/paket" className="btn mt-4 inline-block">Booking Sekarang</Link>
        </div>
      </section>

      <section id="paket" className="space-y-3">
        <h2 className="text-xl font-semibold">Highlight Paket</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Paket Reguler 9H" desc="Hotel dekat, maskapai full service." href="/paket" cta="Lihat Paket"/>
          <Card title="Paket Premium" desc="Hotel bintang 5, menu Indonesia." href="/paket" cta="Lihat Paket"/>
        </div>
        <Link href="/paket" className="navlink">Lihat Semua →</Link>
      </section>
    </div>
  )
}
