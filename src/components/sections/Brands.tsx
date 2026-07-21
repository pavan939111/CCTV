"use client";

const brands = [
  "CP Plus",
  "Hikvision",
  "Dahua",
  "Godrej",
  "UNV",
  "Honeywell",
  "Bosch",
  "Axis",
  "EZVIZ",
  "Panasonic",
];

export default function Brands() {
  // Duplicate list to ensure infinite loops
  const doubleBrands = [...brands, ...brands];

  return (
    <section className="w-full py-10 bg-bg-primary overflow-hidden border-b border-border-custom/30 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-bold tracking-widest text-text-secondary uppercase">
          Certified Partner & Dealership Brands
        </p>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="relative w-full flex items-center overflow-hidden py-4">
        {/* Left & Right Glass Gradients for Soft Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        {/* Scrolling flex track */}
        <div 
          className="flex gap-12 whitespace-nowrap min-w-full justify-around animate-marquee hover:[animation-play-state:paused]"
          style={{
            animation: "marquee 22s linear infinite",
          }}
        >
          {doubleBrands.map((brand, idx) => (
            <div
              key={idx}
              className="text-lg sm:text-xl md:text-2xl font-black font-heading text-text-secondary/60 hover:text-accent transition-colors duration-300 tracking-wider flex items-center justify-center gap-1"
            >
              <span>{brand}</span>
              <span className="text-accent text-xs">●</span>
            </div>
          ))}
        </div>

        {/* Global stylesheet insertion for the marquee keyframes key */}
        <style jsx global>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
