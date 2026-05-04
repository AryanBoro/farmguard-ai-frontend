import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, ArrowUpRight, ShieldCheck } from "lucide-react";
import FarmGuardShell, { PrimaryButton } from "@/components/ui/farmguard-shell";

const fieldClass =
  "w-full h-11 rounded-xl border border-neutral-200 bg-white px-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#556B2F]/30 focus:border-[#556B2F]";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = mode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth flow not wired to a backend yet – navigate to scan as a placeholder
    navigate("/scan");
  };

  return (
    <FarmGuardShell>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 pt-4 lg:pt-8">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F6EC] px-3 py-1 text-xs font-medium text-[#3F5025] mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              {isLogin ? "Welcome back" : "Create account"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
              {isLogin ? "Sign in to" : "Join"}
              <span className="block text-neutral-400">FarmGuard AI.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-neutral-600">
              {isLogin
                ? "Continue protecting your harvest with instant AI-powered crop diagnosis."
                : "Get instant, accurate crop disease detection — your crop doctor, in your pocket."}
            </p>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl bg-white shadow-xl shadow-neutral-200/60 border border-neutral-100 p-6 sm:p-8 space-y-5 self-center w-full"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-700">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@farm.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={fieldClass}
              />
            </div>
          </div>

          <PrimaryButton type="submit" className="w-full">
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowUpRight className="h-4 w-4" />
          </PrimaryButton>

          <p className="text-center text-sm text-neutral-500">
            {isLogin ? (
              <>
                New to FarmGuard?{" "}
                <Link to="/signup" className="font-medium text-[#556B2F] hover:text-[#3F5025]">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-[#556B2F] hover:text-[#3F5025]">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </motion.form>
      </section>
    </FarmGuardShell>
  );
};

export default AuthForm;
