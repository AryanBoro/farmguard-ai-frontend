import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Upload, X, Leaf, MapPin, Calendar, ScanLine, ArrowUpRight, ShieldCheck, Sprout, Activity } from "lucide-react";
import FarmGuardShell, { PrimaryButton, SoftButton } from "@/components/ui/farmguard-shell";
import LocationDropdown from "@/components/LocationDropdown";
import { getCrops, predict, type PredictionResult } from "@/lib/api";

const fieldClass =
  "w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#556B2F]/30 focus:border-[#556B2F]";

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
    getCrops().then(setCrops).catch(() => setCrops([]));
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
    <FarmGuardShell>
      <section className="grid grid-cols-1 gap-10 pt-4 lg:grid-cols-2 lg:gap-12 lg:pt-8">
        {/* Left: heading + form card */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F6EC] px-3 py-1 text-xs font-medium text-[#3F5025] mb-4">
              <ScanLine className="h-3.5 w-3.5" /> AI Crop Scanner
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight">
              Scan your crop{" "}
              <span className="block text-neutral-400">in seconds.</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-neutral-600">
              Upload a clear photo of your crop's leaf. Our AI will identify
              diseases and recommend treatment instantly.
            </p>
          </motion.div>

          {phase === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-6 space-y-5"
            >
              <div
                className={`relative rounded-2xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[180px] ${
                  dragOver
                    ? "border-[#556B2F] bg-[#F4F6EC]"
                    : "border-neutral-200 hover:border-[#556B2F]/50 bg-neutral-50"
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
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white border border-neutral-200 rounded-full p-1.5 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPreview(null);
                      }}
                    >
                      <X className="w-4 h-4 text-neutral-700" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                    <p className="text-sm text-neutral-600">
                      Drag & drop or{" "}
                      <span className="font-medium text-[#556B2F]">browse</span>
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#556B2F]" /> Crop Type
                  </label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Select crop...</option>
                    {crops.map((c, i) => {
                      const val = typeof c === "string" ? c : (c.name || c.id);
                      return (
                        <option key={val + i} value={val}>{val}</option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#556B2F]" /> Crop Age (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g., 90"
                    value={cropAge}
                    onChange={(e) => setCropAge(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#556B2F]" /> Location
                  </label>
                  <LocationDropdown value={location} onChange={setLocation} />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <PrimaryButton onClick={handleScan} className="w-full">
                <ScanLine className="w-4 h-4" /> Scan Now
                <ArrowUpRight className="h-4 w-4" />
              </PrimaryButton>
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-10 text-center space-y-6"
            >
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center animate-pulse"
                style={{ background: "linear-gradient(135deg, #F4F6EC, #C9D4A0)" }}
              >
                <Leaf className="w-8 h-8 text-[#3F5025]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-neutral-900">Analyzing your crop</h2>
                <p className="text-sm text-neutral-500">Our AI is examining the image…</p>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, background: "#556B2F" }}
                  />
                </div>
                <p className="text-sm font-mono text-[#556B2F]">{Math.round(progress)}%</p>
              </div>
            </motion.div>
          )}

          {phase === "done" && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6B8E23, #3F5025)" }}
                >
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Scan complete</h2>
                  <p className="text-xs text-neutral-500">Diagnosis ready</p>
                </div>
              </div>

              <div className="space-y-3">
                <ResultRow label="Disease" value={(() => {
                  const rawName = result.common_name || result.class_name || "Unknown";
                  const normalized = rawName.replace(/\s+/g, " ").trim();
                  return normalized.replace(/^([^\s]+)(?:\s+\1)+\b/i, "$1");
                })()} />
                <ResultRow label="Confidence" value={`${result.confidence}%`} accent />
                {result.severity && (
                  <ResultRow label="Severity" value={result.severity} />
                )}
                {result.description && (
                  <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-4">
                    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Description</p>
                    <p className="text-sm text-neutral-800">{result.description}</p>
                  </div>
                )}
                {!!result.immediate_actions?.length && (
                  <ListBlock title="Immediate Actions" items={result.immediate_actions} />
                )}
                {!!result.prevention?.length && (
                  <ListBlock title="Prevention" items={result.prevention} />
                )}
                {!!result.organic_options?.length && (
                  <ListBlock title="Organic Options" items={result.organic_options} />
                )}
              </div>

              <PrimaryButton
                onClick={() => navigate("/dashboard", { state: { result } })}
                className="w-full"
              >
                View Dashboard <ArrowUpRight className="h-4 w-4" />
              </PrimaryButton>
            </motion.div>
          )}
        </div>

        {/* Right: matching info cards from home */}
        <div className="relative grid grid-cols-2 grid-rows-3 gap-4 min-h-[480px] sm:min-h-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-6 flex flex-col justify-between"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F6EC] px-3 py-1 text-xs font-medium text-[#3F5025] w-fit">
              <ShieldCheck className="h-3.5 w-3.5" /> Disease Shield
            </div>
            <div>
              <h3 className="text-2xl font-semibold leading-snug">
                Early detection
                <span className="block text-neutral-500">protects every crop</span>
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Trained on thousands of leaf samples across 14 species.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <Sprout className="h-4 w-4 text-[#556B2F]" /> Coverage
            </div>
            <div>
              <p className="text-2xl font-bold">35+</p>
              <p className="text-xs text-neutral-500">diseases detected</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <Activity className="h-4 w-4 text-[#556B2F]" /> Accuracy
            </div>
            <div>
              <p className="text-2xl font-bold">96%</p>
              <p className="text-xs font-medium text-[#556B2F]">↑ AI confidence</p>
            </div>
          </motion.div>
        </div>
      </section>
    </FarmGuardShell>
  );
};

const ResultRow: React.FC<{ label: string; value: string; accent?: boolean }> = ({ label, value, accent }) => (
  <div className="flex items-center justify-between rounded-2xl bg-neutral-50 border border-neutral-100 px-4 py-3">
    <span className="text-xs uppercase tracking-wider text-neutral-500">{label}</span>
    <span className={`text-sm font-semibold ${accent ? "text-[#556B2F]" : "text-neutral-900"}`}>{value}</span>
  </div>
);

const ListBlock: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-4">
    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">{title}</p>
    <ul className="text-sm text-neutral-800 space-y-1 list-disc list-inside">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  </div>
);

export default ScanPage;
