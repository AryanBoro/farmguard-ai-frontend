import React from "react";
import {
  ArrowRight,
  Play,
  Target,
  Crown,
  Star,
  Hexagon,
  Triangle,
  Command,
  Ghost,
  Gem,
  Cpu,
} from "lucide-react";

const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Quantum", icon: Triangle },
  { name: "Command+Z", icon: Command },
  { name: "Phantom", icon: Ghost },
  { name: "Ruby", icon: Gem },
  { name: "Chipset", icon: Cpu },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-medium text-foreground">Award-Winning Design</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in delay-200">
              <span className="text-foreground">Crafting Digital</span>
              <br />
              <span className="text-primary text-glow">Experiences</span>
              <br />
              <span className="text-foreground">That Matter</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg animate-fade-in delay-300">
              We design interfaces that combine beauty with functionality,
              creating seamless experiences that users love and businesses thrive on.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in delay-400">
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)]">
                View Portfolio
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="inline-flex items-center gap-2 glass text-foreground px-6 py-3 rounded-full font-semibold hover:bg-[hsla(220,15%,15%,0.6)] transition-all">
                <Play className="w-4 h-4" />
                Watch Showreel
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="relative animate-fade-in delay-300">
              {/* Glow */}
              <div className="absolute -inset-1 bg-primary/10 rounded-3xl blur-xl" />

              <div className="relative glass-strong rounded-2xl p-6 space-y-5 glass-glow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">150+</p>
                    <p className="text-sm text-muted-foreground">Projects Delivered</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Client Satisfaction</span>
                    <span className="text-primary font-semibold">98%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <StatItem value="50+" label="Team Members" />
                  <StatItem value="12" label="Countries" />
                  <StatItem value="99%" label="Uptime" />
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-medium text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    ACTIVE
                  </span>
                  <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-medium text-foreground">
                    <Crown className="w-3 h-3" />
                    PREMIUM
                  </span>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div className="glass-strong rounded-2xl p-4 overflow-hidden animate-fade-in delay-500">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Trusted by Industry Leaders
              </p>
              <div className="overflow-hidden">
                <div className="flex animate-marquee w-max">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-6 py-2 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <client.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
