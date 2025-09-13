import Hero from "@/components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <section id="paket" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2">Paket</h2>
        <p className="text-gray-600">Daftar paket umroh & wisata akan ditaruh di sini.</p>
      </section>
      <section id="tabungan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2">Tabungan</h2>
        <p className="text-gray-600">Informasi program tabungan jamaah.</p>
      </section>
      <section id="corporate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2">Korporasi</h2>
        <p className="text-gray-600">Solusi umroh korporasi & instansi.</p>
      </section>
      <section id="wisata" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2">Wisata Halal</h2>
        <p className="text-gray-600">Jelajah halal dunia: Turkey, Dubai, Eropa, Asia.</p>
      </section>
      <section id="profile" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        <p className="text-gray-600">Company profile akan ditaruh di sini.</p>
      </section>
      <section id="whyus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#f9f9f9]">
        <h2 className="text-2xl font-bold mb-2">Why Us</h2>
        <p className="text-gray-600">Kenapa memilih Mumtaz Madaniah Utama? Alasan & nilai unggul kami.</p>
      </section>
    </main>
  );
}
