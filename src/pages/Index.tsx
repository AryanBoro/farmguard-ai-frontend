import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Target,
  Crown,
  Star,
  Shield,
  Zap,
  BarChart3,
  Sprout,
  TreePine,
  Wheat,
  Apple,
  Flower2,
  CloudRain,
} from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

const PARTNERS = [
  { name: "AgriTech", icon: Sprout },
  { name: "CropSense", icon: Wheat },
  { name: "GreenField", icon: TreePine },
  { name: "HarvestAI", icon: Apple },
  { name: "FloraLab", icon: Flower2 },
  { name: "RainWatch", icon: CloudRain },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedShaderBackground />

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .hero-marquee {
          animation: marquee 40s linear infinite;
        }
        .hd-100 { animation-delay: 0.1s; }
        .hd-200 { animation-delay: 0.2s; }
        .hd-300 { animation-delay: 0.3s; }
        .hd-400 { animation-delay: 0.4s; }
        .hd-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />

      {/* Top nav removed - testing button moved to CTA section */}

      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="hero-fade-in hd-100">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-medium text-foreground">AI-Powered Crop Protection</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight hero-fade-in hd-200">
              <span className="text-foreground">FarmGuard </span>
              <span className="text-primary text-glow">AI</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg hero-fade-in hd-300">
              Protect your crops with intelligent disease detection. Upload a photo,
              get instant diagnosis and treatment recommendations powered by deep learning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 hero-fade-in hd-400">
              <button
                onClick={() => navigate("/scan")}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-[0_0_25px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_35px_-5px_hsl(var(--primary)/0.7)] text-base"
              >
                <Leaf className="w-5 h-5" />
                Scan Your Crop
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 glass text-foreground px-6 py-3.5 rounded-full font-semibold hover:bg-[hsla(220,15%,15%,0.6)] transition-all"
              >
                <BarChart3 className="w-5 h-5" />
                View Dashboard
              </button>

              <button
                onClick={() => navigate("/testing")}
                className="inline-flex items-center gap-2 glass text-foreground px-6 py-3.5 rounded-full font-semibold hover:bg-[hsla(220,15%,15%,0.6)] transition-all border border-primary/30"
              >
                🧪 Testing Guide
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="relative hero-fade-in hd-300">
              {/* Glow */}
              <div className="absolute -inset-1 bg-primary/10 rounded-3xl blur-xl" />

              <div className="relative glass-strong rounded-2xl p-6 space-y-5 glass-glow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">Real-Time Crop Analysis</p>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Detection Accuracy</span>
                    <span className="text-primary font-semibold">96%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <StatItem value="14" label="Crop Types" />
                  <StatItem value="35+" label="Diseases" />
                  <StatItem value="<2s" label="Scan Time" />
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-medium text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    LIVE
                  </span>
                  <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-medium text-foreground">
                    <Shield className="w-3 h-3" />
                    AI-POWERED
                  </span>
                  <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-medium text-foreground">
                    <Crown className="w-3 h-3" />
                    FREE
                  </span>
                </div>
              </div>
            </div>

            {/* Feature mini cards */}
            <div className="grid grid-cols-3 gap-3 hero-fade-in hd-400">
              {[
                { icon: Shield, label: "Disease ID" },
                { icon: Zap, label: "Instant" },
                { icon: BarChart3, label: "Analytics" },
              ].map((f) => (
                <div key={f.label} className="glass-strong rounded-xl p-4 flex flex-col items-center gap-2 text-center glass-glow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Marquee Card */}
            <div className="glass-strong rounded-2xl p-4 overflow-hidden hero-fade-in hd-500">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Protecting Farms Worldwide 🌍
              </p>
              <div className="overflow-hidden">
                <div className="flex hero-marquee w-max">
                  {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((client, i) => (
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
    </div>
  );
};

export default Index;
