"use client";

const brandLogos = [
  "HIKVISION",
  "DAHUA",
  "CP PLUS",
  "HONEYWELL",
  "UNV",
  "GODREJ",
];

export default function Brands() {
  // Duplicate array to achieve infinite loop seamless effect
  const scrollingLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section className="py-12 border-y border-white/5 bg-[#0B1220]/20 select-none relative z-10 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .ticker-animate {
          display: flex;
          width: 300%;
          animation: ticker-scroll 25s linear infinite;
        }
        .ticker-animate:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-secondary text-[10px] font-bold uppercase tracking-[0.25em] mb-8 opacity-65">
          Authorized Installation Partners
        </p>
        
        {/* Marquee Wrapper */}
        <div className="w-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
          
          <div className="ticker-animate gap-16 md:gap-24 items-center">
            {scrollingLogos.map((logo, idx) => (
              <div
                key={idx}
                className="text-lg sm:text-2xl font-black tracking-tighter text-text-secondary hover:text-accent transition-colors duration-300 cursor-pointer uppercase select-none opacity-45 hover:opacity-100 flex-1 text-center font-heading"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
