import { 
  Home, Building, Briefcase, ShoppingBag, HardDrive, Factory, 
  GraduationCap, PlusSquare, Bed, Utensils, Shield, CreditCard, Castle 
} from "lucide-react";

const industries = [
  { name: "Homes", icon: Home },
  { name: "Apartments", icon: Building },
  { name: "Offices", icon: Briefcase },
  { name: "Retail Shops", icon: ShoppingBag },
  { name: "Warehouses", icon: HardDrive },
  { name: "Factories", icon: Factory },
  { name: "Schools", icon: GraduationCap },
  { name: "Hospitals", icon: PlusSquare },
  { name: "Hotels", icon: Bed },
  { name: "Restaurants", icon: Utensils },
  { name: "Construction Sites", icon: Shield },
  { name: "Banks & ATMs", icon: CreditCard },
  { name: "Govt Buildings", icon: Castle },
];

export default function Industries() {
  return (
    <section className="w-full py-20 bg-bg-secondary/40 border-b border-border-custom/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary">
            Sectors We <span className="text-accent">Protect</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            We adapt camera specs, resolutions, and structural casings to suit the unique vulnerabilities of each industry sector.
          </p>
        </div>

        {/* Industries Grid (desktop 5 cols, mobile 2 cols) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="glass-card p-4 flex flex-col items-center justify-center text-center space-y-3 bg-bg-primary/40 border border-border-custom/50 hover:border-accent/40 hover:bg-bg-secondary/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-bg-secondary text-text-secondary group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary tracking-wide">
                  {ind.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
