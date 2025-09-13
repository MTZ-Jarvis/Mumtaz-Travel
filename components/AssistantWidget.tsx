"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";

const WA = "https://wa.me/62895600000101?text=Assalamu'alaikum%2C%20saya%20ingin%20bertanya%20seputar%20Umroh%20Mumtaz.";

type Msg = { from: "user" | "ai"; text: string };

const FAQ: { q: string; a: string }[] = [
  { q: "Apa itu program tabungan umroh?", a: "Program tabungan umroh adalah skema menabung bertahap dengan setoran fleksibel dan akad syariah. Dana transparan & dapat dimonitor." },
  { q: "Dokumen apa saja untuk umroh?", a: "Umumnya: paspor aktif ≥8 bulan, buku nikah/akta lahir (kasus tertentu), kartu vaksin internasional, dan pas foto latar putih." },
  { q: "Kapan jadwal keberangkatan?", a: "Jadwal bergantung kuota maskapai & hotel. Untuk jadwal terdekat, sebutkan bulan yang diinginkan agar kami cocokkan batch." },
  { q: "Fasilitas hotel apa saja?", a: "Standar kami hotel dekat Masjidil Haram/Nabawi sesuai paket (bintang 3–5), makan 3x, bus AC, dan mutawwif berpengalaman." },
  { q: "Apakah Mumtaz resmi PPIU?", a: "Ya, berizin PPIU Kemenag (02201013519080004) dan tergabung di ASTINDO & SAPUHI." },
  { q: "Refund dan reschedule bagaimana?", a: "Mengikuti kebijakan maskapai & hotel. Kami bantu proses administrasi secara transparan." },
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "ai", text: "Halo! Saya asisten Mumtaz. Silakan tanya apa saja. Contoh: 'dokumen umroh', 'jadwal', atau 'tabungan'." },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const match = (text: string) => {
    const t = text.toLowerCase();
    const hit = FAQ.find(({ q }) => t.includes(q.toLowerCase().split(" ")[0]) || t.includes(q.toLowerCase().split("?")[0]));
    return hit?.a;
  };

  const send = () => {
    const val = input.trim();
    if (!val) return;
    setMsgs((m) => [...m, { from: "user", text: val }]);
    setInput("");
    const ans = match(val);
    setTimeout(() => {
      if (ans) {
        setMsgs((m) => [...m, { from: "ai", text: ans }]);
      } else {
        setMsgs((m) => [
          ...m,
          {
            from: "ai",
            text:
              "Maaf, saya belum yakin. Boleh jelaskan lebih spesifik? Atau klik 'Chat WhatsApp' untuk terhubung langsung dengan admin.",
          },
        ]);
      }
    }, 350);
  };

  const suggestions = useMemo(
    () => ["Program tabungan umroh", "Dokumen umroh", "Jadwal keberangkatan", "Fasilitas hotel", "Refund", "Legalitas PPIU"],
    []
  );

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#D4AF37] text-[#561614] shadow-lg flex items-center justify-center hover:brightness-95"
          aria-label="Buka AI Help"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md rounded-2xl border border-black/10 bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#6A1D1B] text-white">
            <div className="font-semibold">AI Help — Mumtaz</div>
            <button onClick={() => setOpen(false)} aria-label="Tutup" className="opacity-90 hover:opacity-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[50vh] overflow-y-auto px-4 py-3 space-y-2">
            {msgs.map((m, idx) => (
              <div key={idx} className={`flex ${m.from === "ai" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.from === "ai"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-[#D4AF37] text-[#561614]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setInput(s);
                  setTimeout(() => send(), 0);
                }}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Tulis pertanyaan kamu…"
              className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            />
            <button
              onClick={send}
              className="inline-flex items-center gap-1 rounded-xl bg-[#D4AF37] text-[#561614] px-3 py-2 text-sm font-semibold hover:brightness-95"
            >
              <Send className="h-4 w-4" /> Kirim
            </button>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              title="Chat WhatsApp"
            >
              <Phone className="h-4 w-4" /> WA
            </a>
          </div>
        </div>
      )}
    </>
  );
}
