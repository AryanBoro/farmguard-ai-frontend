import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, Leaf, MapPin, Calendar, ArrowLeft } from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCrops, predict, type CropType, type PredictionResult } from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import LocationDropdown from "@/components/LocationDropdown";

const ScanPage = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cropType, setCropType] = useState("");
  const [cropAge, setCropAge] = useState("");
  const [location, setLocation] = useState("");
  const [phase, setPhase] = useState<"form" | "loading" | "done">("form");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    getCrops()
      .then(setCrops)
      .catch(() => setCrops([]));
  }, []);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith("image/")) handleFile(f);
    },
    [handleFile]
  );

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleScan = async () => {
    if (!file || !cropType) {
      setError("Please upload an image and select a crop type.");
      return;
    }
    setPhase("loading");
    setProgress(0);

    // Simulate progress while waiting for API
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 8, 90));
    }, 200);

    try {
      const res = await predict(file, cropType, cropAge, location);
      clearInterval(interval);
      setProgress(100);
      setResult(res);
      setTimeout(() => setPhase("done"), 600);
    } catch (err: any) {
      clearInterval(interval);
      setError(err?.message || "Scan failed. Please try again.");
      setPhase("form");
      setProgress(0);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      <AnimatedShaderBackground />

      <div className="relative z-10 w-full max-w-lg">
        <Button
          variant="glass"
          size="sm"
          className="mb-6 rounded-full"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        {phase === "form" && (
          <GlassCard
            strong
            glow
            className="p-8 space-y-6 opacity-0"
            style={{ animation: "fadeSlideIn 0.6s ease-out forwards" }}
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Scan Your Crop</h2>
              <p className="text-sm text-muted-foreground">Upload a photo for AI diagnosis</p>
            </div>

            {/* Drop zone */}
            <div
              className={`relative rounded-xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px] ${
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileInput}
              />
              {preview ? (
                <div className="relative w-full h-48">
                  <img
                    src={preview}
                    alt="Crop preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-2 right-2 glass rounded-full p-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setPreview(null);
                    }}
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or <span className="text-primary font-medium">browse</span>
                  </p>
                </>
              )}
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" /> Crop Type
                </Label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full h-10 rounded-lg px-3 text-sm glass text-foreground border-0 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" className="bg-background">Select crop...</option>
                  {crops.map((c, i) => {
                    const val = typeof c === "string" ? c : (c.name || c.id);
                    return (
                      <option key={val + i} value={val} className="bg-background">
                        {val}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Crop Age (days)
                </Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g., 90"
                  value={cropAge}
                  onChange={(e) => setCropAge(e.target.value)}
                  className="glass border-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Location
                </Label>
                <LocationDropdown value={location} onChange={setLocation} />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              variant="glow"
              size="xl"
              className="w-full rounded-xl font-semibold"
              onClick={handleScan}
            >
              <Leaf className="w-5 h-5 mr-1" /> Scan
            </Button>
          </GlassCard>
        )}

        {phase === "loading" && (
          <GlassCard
            strong
            glow
            className="p-10 space-y-8 text-center opacity-0"
            style={{ animation: "fadeSlideIn 0.6s ease-out forwards" }}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse-glow">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Analyzing Your Crop</h2>
              <p className="text-sm text-muted-foreground">
                Our AI is examining the image for diseases...
              </p>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-3 rounded-full bg-muted" />
              <p className="text-sm text-primary font-mono">{Math.round(progress)}%</p>
            </div>
          </GlassCard>
        )}

        {phase === "done" && result && (
          <GlassCard
            strong
            glow
            className="p-8 space-y-6 text-center opacity-0"
            style={{ animation: "fadeSlideIn 0.6s ease-out forwards" }}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Scan Complete!</h2>
            <div className="space-y-3 text-left">
              <GlassCard className="p-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Disease</p>
                <p className="font-semibold text-foreground">
                  {(() => {
                    const rawName = result.common_name || result.class_name || "Unknown";
                    const normalized = rawName.replace(/\s+/g, " ").trim();
                    return normalized.replace(/^([^\s]+)(?:\s+\1)+\b/i, "$1");
                  })()}
                </p>
              </GlassCard>
              <GlassCard className="p-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
                <p className="font-semibold text-primary">{result.confidence}%</p>
              </GlassCard>
              {result.severity && (
                <GlassCard className="p-4 space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Severity</p>
                  <p className="font-semibold capitalize" style={{ color: result.severity_color }}>{result.severity}</p>
                </GlassCard>
              )}
              {result.description && (
                <GlassCard className="p-4 space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Description</p>
                  <p className="text-sm text-foreground">{result.description}</p>
                </GlassCard>
              )}
              {result.immediate_actions?.length > 0 && (
                <GlassCard className="p-4 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Immediate Actions</p>
                  <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                    {result.immediate_actions.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </GlassCard>
              )}
              {result.prevention?.length > 0 && (
                <GlassCard className="p-4 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Prevention</p>
                  <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                    {result.prevention.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </GlassCard>
              )}
              {result.organic_options?.length > 0 && (
                <GlassCard className="p-4 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Organic Options</p>
                  <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                    {result.organic_options.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </GlassCard>
              )}
            </div>

            <Button
              variant="glow"
              size="xl"
              className="w-full rounded-xl font-semibold"
              onClick={() => navigate("/dashboard", { state: { result } })}
            >
              View Dashboard
            </Button>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default ScanPage;
