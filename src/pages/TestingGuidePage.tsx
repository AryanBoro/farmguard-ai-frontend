import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

import appleBlackRot from "@/assets/samples/apple-black-rot.webp";
import healthyStrawberry from "@/assets/samples/healthy-strawberry.webp";
import pepperBacterialSpot from "@/assets/samples/pepper-bacterial-spot.webp";
import potatoEarlyBlight from "@/assets/samples/potato-early-blight.webp";
import squashPowderyMildew from "@/assets/samples/squash-powdery-mildew.webp";
import strawberryLeafScorch from "@/assets/samples/strawberry-leaf-scorch.webp";
import tomatoHealthy from "@/assets/samples/tomato-healthy.webp";

const SAMPLE_IMAGES = [
  { src: appleBlackRot, label: "Apple Black Rot", crop: "Apple" },
  { src: healthyStrawberry, label: "Healthy Strawberry", crop: "Strawberry" },
  { src: pepperBacterialSpot, label: "Pepper Bacterial Spot", crop: "Pepper" },
  { src: potatoEarlyBlight, label: "Potato Early Blight", crop: "Potato" },
  { src: squashPowderyMildew, label: "Squash Powdery Mildew", crop: "Squash" },
  { src: strawberryLeafScorch, label: "Strawberry Leaf Scorch", crop: "Strawberry" },
  { src: tomatoHealthy, label: "Tomato Healthy", crop: "Tomato" },
];

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

  const handleDownload = async (src: string, filename: string) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 sm:justify-between">
            {[
              { step: "1", text: "Click a sample image below to download it" },
              { step: "2", text: "Go to the Scan page" },
              { step: "3", text: "Upload the saved image and scan!" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {s.step}
                </div>
                <p className="text-sm text-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Sample Images */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">Use Sample Images</h2>
          <p className="text-sm text-muted-foreground mb-5">Click any image to download it, then upload it on the Scan page</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SAMPLE_IMAGES.map((img) => (
              <GlassCard
                key={img.label}
                className="overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform"
                onClick={() => handleDownload(img.src, `${img.label.toLowerCase().replace(/\s+/g, "-")}.webp`)}
              >
                <div className="relative">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-sm font-semibold text-foreground">{img.label}</p>
                  <p className="text-xs text-muted-foreground">{img.crop}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CROP_DATA.map((crop) => (
            <GlassCard key={crop.name} className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">{crop.name}</h3>
              <div className="space-y-1.5">
                {crop.diseases.map((disease) => (
                  <div key={disease} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {disease === "Healthy" ? "✅ Healthy" : `🔴 ${disease}`}
                    </span>
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
