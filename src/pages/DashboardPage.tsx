import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  Activity,
  ShieldCheck,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getHistory,
  getStats,
  getTrends,
  type DashboardStats,
  type HistoryItem,
  type TrendData,
  type PredictionResult,
} from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const StatCard = ({
  icon: Icon,
  label,
  value,
  color = "text-primary",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: string;
}) => (
  <GlassCard glow className="p-5 flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </GlassCard>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const latestResult = (location.state as { result?: PredictionResult })?.result;

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getHistory(), getTrends()])
      .then(([s, h, t]) => {
        setStats(s);
        setHistory(h);
        setTrends(t);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedShaderBackground />

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="glass" size="sm" className="rounded-full" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Home
          </Button>
          <Button variant="glow" size="sm" className="rounded-full" onClick={() => navigate("/scan")}>
            <Leaf className="w-4 h-4 mr-1" /> New Scan
          </Button>
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold text-foreground opacity-0"
          style={{ animation: "fadeSlideIn 0.6s ease-out forwards" }}
        >
          Dashboard
        </h1>

        {/* Latest result */}
        {latestResult && (
          <GlassCard
            strong
            glow
            className="p-6 space-y-4 opacity-0"
            style={{ animation: "fadeSlideIn 0.6s ease-out 0.1s forwards" }}
          >
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Latest Scan Result
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Disease</p>
                <p className="font-semibold text-foreground">{latestResult.disease}</p>
              </GlassCard>
              <GlassCard className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Confidence</p>
                <p className="font-semibold text-primary">
                  {((latestResult.confidence || 0) * 100).toFixed(1)}%
                </p>
              </GlassCard>
              <GlassCard className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Severity</p>
                <p className="font-semibold text-foreground">{latestResult.severity || "N/A"}</p>
              </GlassCard>
            </div>
            {(latestResult.treatment || latestResult.description) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {latestResult.description && (
                  <GlassCard className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
                    <p className="text-sm text-foreground">{latestResult.description}</p>
                  </GlassCard>
                )}
                {latestResult.treatment && (
                  <GlassCard className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Treatment</p>
                    <p className="text-sm text-foreground">{latestResult.treatment}</p>
                  </GlassCard>
                )}
              </div>
            )}
            {latestResult.prevention && (
              <GlassCard className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Prevention</p>
                <p className="text-sm text-foreground">{latestResult.prevention}</p>
              </GlassCard>
            )}
          </GlassCard>
        )}

        {/* Stats */}
        {stats && (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0"
            style={{ animation: "fadeSlideIn 0.6s ease-out 0.2s forwards" }}
          >
            <StatCard icon={BarChart3} label="Total Scans" value={stats.total_scans} />
            <StatCard icon={AlertTriangle} label="Diseases Found" value={stats.diseases_detected} color="text-destructive" />
            <StatCard icon={CheckCircle2} label="Healthy Crops" value={stats.healthy_crops} />
            <StatCard icon={ShieldCheck} label="Accuracy" value={`${stats.accuracy}%`} />
          </div>
        )}

        {/* Trends chart */}
        {trends.length > 0 && (
          <GlassCard
            strong
            glow
            className="p-6 opacity-0"
            style={{ animation: "fadeSlideIn 0.6s ease-out 0.3s forwards" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Scan Trends
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsla(220,15%,25%,0.3)" />
                  <XAxis dataKey="date" stroke="hsl(220,10%,55%)" fontSize={12} />
                  <YAxis stroke="hsl(220,10%,55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsla(220,15%,10%,0.9)",
                      border: "1px solid hsla(180,20%,95%,0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(20px)",
                    }}
                    labelStyle={{ color: "hsl(180,20%,95%)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="scans"
                    stroke="hsl(160,80%,45%)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="diseases"
                    stroke="hsl(0,72%,51%)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        )}

        {/* History */}
        {history.length > 0 && (
          <GlassCard
            strong
            className="p-6 opacity-0"
            style={{ animation: "fadeSlideIn 0.6s ease-out 0.4s forwards" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Scan History
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {history.map((item, i) => (
                <GlassCard key={item.id || i} className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{item.disease}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.crop_type} • {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                      {((item.confidence || 0) * 100).toFixed(0)}%
                    </p>
                    {item.severity && (
                      <p className="text-xs text-muted-foreground">{item.severity}</p>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center animate-pulse-glow mb-4">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
