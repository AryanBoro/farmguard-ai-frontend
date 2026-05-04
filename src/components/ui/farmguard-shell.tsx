import React from "react";
import { Leaf, LogIn, UserPlus, ScanLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ShellProps {
  children: React.ReactNode;
}

export const SoftButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
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

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50 ${className}`}
    style={{ background: "#556B2F", boxShadow: "0 10px 25px -10px rgba(85,107,47,0.6)" }}
    {...props}
  >
    {children}
  </button>
);

const FarmGuardShell: React.FC<ShellProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="font-jakarta min-h-screen w-full bg-gradient-to-b from-neutral-50 via-white to-[#F4F6EC] text-neutral-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif; }
      `}</style>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg, #6B8E23, #3F5025)" }}
          >
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">farmguard</span>
        </button>

        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate("/scan")}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <ScanLine className="h-4 w-4" />
            Scan
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <SoftButton onClick={() => navigate("/login")}>
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
          </SoftButton>
          <button
            onClick={() => navigate("/signup")}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Up</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">{children}</main>

      <footer className="border-t border-neutral-200/60 py-8 text-center">
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} FarmGuard AI — Protecting crops with intelligence.
        </p>
      </footer>
    </div>
  );
};

export default FarmGuardShell;
