import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowUpRight, LogIn, UserPlus, Leaf, Sprout, ScanLine, Activity } from "lucide-react";
import darkLeaves from "@/assets/dark-leaves.jpg";

interface FarmGuardLandingPageProps {
  onScanClick?: () => void;
  onDashboardClick?: () => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-2xl font-bold text-neutral-900">{value}</span>
    <span className="text-xs text-neutral-500 mt-0.5">{label}</span>
  </div>
);

const SoftButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 hover:shadow ${className}`}
    {...props}
  >
    {children}
  </button>
);

function MiniBars() {
  return (
    <div className="flex items-end gap-1 h-12">
      {[18, 48, 72, 96].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          className="w-2 rounded-t"
          style={{ background: "linear-gradient(to top, #556B2F, #8A9A5B)" }}
        />
      ))}
    </div>
  );
}

function LeafGrid() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 grid grid-cols-4 gap-1.5 p-3">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className={`rounded-md aspect-square ${
              i % 5 === 0
                ? "bg-[#556B2F]/80"
                : i % 3 === 0
                ? "bg-[#C9D4A0]"
                : "bg-[#F4F6EC]"
            }`}
          />
        ))}
      </div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-3 right-3 h-12 w-12 rounded-2xl bg-white shadow-lg flex items-center justify-center"
      >
        <ScanLine className="h-6 w-6 text-[#556B2F]" />
      </motion.div>
    </div>
  );
}

export default function FarmGuardLandingPage({
  onScanClick,
  onDashboardClick,
  onLoginClick,
  onSignupClick,
}: FarmGuardLandingPageProps) {
  return (
    <div className="font-jakarta min-h-screen w-full bg-gradient-to-b from-neutral-50 via-white to-[#F4F6EC] text-neutral-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif; }
      `}</style>

      {/* Top nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-2">
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg, #6B8E23, #3F5025)" }}
          >
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">farmguard</span>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={onScanClick}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <ScanLine className="h-4 w-4" />
            Scan
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <SoftButton onClick={onLoginClick}>
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
          </SoftButton>
          <button
            onClick={onSignupClick}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Up</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:grid-cols-2 lg:gap-12 lg:pt-16">
        {/* Left: headline */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Secure your harvest{" "}
              <span className="block text-neutral-400">with precision.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-neutral-600">
              Join thousands of farmers who choose FarmGuard AI for instant,
              accurate crop disease detection — your crop doctor, in your pocket.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onScanClick}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{ background: "#556B2F", boxShadow: "0 10px 25px -10px rgba(85,107,47,0.6)" }}
            >
              Scan Now
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <SoftButton onClick={onDashboardClick}>View Dashboard</SoftButton>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-sm">
            <Stat value="96%" label="AI Accuracy" />
            <Stat value="35+" label="Diseases" />
            <Stat value="<2s" label="Scan Time" />
          </div>

          <div className="mt-12">
            <p className="text-xs font-semibold tracking-widest text-neutral-400">
              TRUSTED BY GROWERS
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-neutral-400">
              <span className="text-lg font-bold">AgriCo</span>
              <span className="text-lg font-bold">GreenFields</span>
              <span className="text-lg font-bold">HarvestPro</span>
            </div>
          </div>
        </div>

        {/* Right: animated card grid */}
        <div className="relative grid grid-cols-2 grid-rows-2 gap-4 min-h-[480px] sm:min-h-[560px]">
          {/* Secure card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="row-span-2 rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-5 flex flex-col"
          >
            <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[180px]" style={{ background: "linear-gradient(135deg, #F4F6EC, #E6EBD3)" }}>
              <LeafGrid />
            </div>

            <div className="mt-4 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F6EC] px-3 py-1 text-xs font-medium text-[#3F5025]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Disease Shield
              </div>
              <h3 className="text-lg font-semibold leading-snug">
                Early detection
                <br />
                <span className="text-neutral-500">protects every crop</span>
              </h3>
              <button
                onClick={onScanClick}
                className="text-sm font-medium text-[#3F5025] hover:text-[#2A361A] inline-flex items-center gap-1"
              >
                Try a scan <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Crops card — dark leaves image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-3xl text-white shadow-xl p-5 flex flex-col justify-between overflow-hidden"
          >
            <img
              src={darkLeaves}
              alt="Dark stylized leaves"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
            <div className="relative flex items-center justify-between">
              <Sprout className="h-6 w-6 text-[#A8B97A]" />
              <span className="text-xs text-neutral-300">14 species</span>
            </div>
            <div className="relative">
              <p className="text-xs text-neutral-300 mb-1">Coverage</p>
              <p className="text-base font-semibold leading-tight">
                Hundreds of
                <br />
                diseases in one app
              </p>
            </div>
          </motion.div>

          {/* Growth card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-neutral-500 text-xs">
                <Activity className="h-3.5 w-3.5" />
                Yield Recovery
              </div>
              <p className="mt-2 text-2xl font-bold">+24.5%</p>
              <p className="text-xs font-medium text-[#556B2F]">↑ vs untreated</p>
            </div>
            <MiniBars />
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-neutral-200/60 py-8 text-center">
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} FarmGuard AI — Protecting crops with intelligence.
        </p>
      </footer>
    </div>
  );
}
