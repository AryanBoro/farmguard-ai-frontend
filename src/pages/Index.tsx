import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Shield, Zap, BarChart3 } from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, title: "Disease Detection", desc: "AI-powered crop disease identification" },
  { icon: Zap, title: "Instant Results", desc: "Get diagnosis in seconds" },
  { icon: BarChart3, title: "Analytics", desc: "Track trends & history" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AnimatedShaderBackground />

      <div className="relative z-10 flex flex-col items-center gap-10 px-4 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className="opacity-0"
          style={{ animation: "fadeSlideIn 0.8s ease-out 0.1s forwards" }}
        >
          <GlassCard className="inline-flex items-center gap-2 px-4 py-2 rounded-full">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Crop Protection</span>
          </GlassCard>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight opacity-0"
          style={{ animation: "fadeSlideIn 0.8s ease-out 0.2s forwards" }}
        >
          <span className="text-foreground">FarmGuard</span>{" "}
          <span className="text-primary text-glow">AI</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0"
          style={{ animation: "fadeSlideIn 0.8s ease-out 0.3s forwards" }}
        >
          Protect your crops with intelligent disease detection. Upload a photo,
          get instant diagnosis and treatment recommendations.
        </p>

        {/* CTA */}
        <div
          className="opacity-0"
          style={{ animation: "fadeSlideIn 0.8s ease-out 0.4s forwards" }}
        >
          <Button
            variant="glow"
            size="xl"
            className="rounded-full text-lg font-semibold"
            onClick={() => navigate("/scan")}
          >
            <Leaf className="w-5 h-5 mr-1" />
            Scan Your Crop
          </Button>
        </div>

        {/* Feature cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6 opacity-0"
          style={{ animation: "fadeSlideIn 0.8s ease-out 0.5s forwards" }}
        >
          {features.map((f) => (
            <GlassCard key={f.title} glow className="p-6 flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
