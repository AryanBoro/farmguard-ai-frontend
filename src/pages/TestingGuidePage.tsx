import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ExternalLink } from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const CROP_DATA = [
  {
    name: "Apple",
    diseases: ["Apple Scab", "Black Rot", "Cedar Apple Rust", "Healthy"],
  },
  {
    name: "Blueberry",
    diseases: ["Healthy"],
  },
  {
    name: "Cherry",
    diseases: ["Powdery Mildew", "Healthy"],
  },
  {
    name: "Corn (Maize)",
    diseases: ["Cercospora Leaf Spot (Gray Leaf Spot)", "Common Rust", "Northern Leaf Blight", "Healthy"],
  },
  {
    name: "Grape",
    diseases: ["Black Rot", "Esca (Black Measles)", "Leaf Blight (Isariopsis Leaf Spot)", "Healthy"],
  },
  {
    name: "Orange",
    diseases: ["Haunglongbing (Citrus Greening)"],
  },
  {
    name: "Peach",
    diseases: ["Bacterial Spot", "Healthy"],
  },
  {
    name: "Pepper (Bell)",
    diseases: ["Bacterial Spot", "Healthy"],
  },
  {
    name: "Potato",
    diseases: ["Early Blight", "Late Blight", "Healthy"],
  },
  {
    name: "Raspberry",
    diseases: ["Healthy"],
  },
  {
    name: "Soybean",
    diseases: ["Healthy"],
  },
  {
    name: "Squash",
    diseases: ["Powdery Mildew"],
  },
  {
    name: "Strawberry",
    diseases: ["Leaf Scorch", "Healthy"],
  },
  {
    name: "Tomato",
    diseases: [
      "Bacterial Spot",
      "Early Blight",
      "Late Blight",
      "Leaf Mold",
      "Septoria Leaf Spot",
      "Spider Mites (Two-Spotted)",
      "Target Spot",
      "Yellow Leaf Curl Virus",
      "Mosaic Virus",
      "Healthy",
    ],
  },
];

const TestingGuidePage = () => {
  const navigate = useNavigate();

  const getSearchUrl = (crop: string, disease: string) => {
    const query = disease === "Healthy"
      ? `${crop} healthy leaf`
      : `${crop} ${disease} leaf disease`;
    return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedShaderBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />

      <div className="relative z-[2] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="glass"
          size="sm"
          className="mb-6 rounded-full"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Test <span className="text-primary text-glow">FarmGuard AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Here's everything you need to test the app yourself
          </p>
        </div>

        {/* Instructions */}
        <GlassCard strong glow className="p-6 mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">How to Test</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1", text: "Pick a crop below" },
              { step: "2", text: 'Click "Search Sample Image"' },
              { step: "3", text: "Save any image from Google" },
              { step: "4", text: "Go to Scan page and upload it" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {s.step}
                </div>
                <p className="text-sm text-foreground pt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CROP_DATA.map((crop) => (
            <GlassCard key={crop.name} className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">{crop.name}</h3>
              <div className="space-y-1.5">
                {crop.diseases.map((disease) => (
                  <div
                    key={disease}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-sm text-muted-foreground truncate">
                      {disease === "Healthy" ? "✅ Healthy" : `🔴 ${disease}`}
                    </span>
                    <a
                      href={getSearchUrl(crop.name, disease)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      <Search className="w-3 h-3" />
                      <span className="hidden sm:inline">Search</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button
            variant="glow"
            size="xl"
            className="rounded-xl font-semibold"
            onClick={() => navigate("/scan")}
          >
            Go to Scan Page →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestingGuidePage;
