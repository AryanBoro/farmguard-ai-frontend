import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FarmGuardLandingPage from "@/components/ui/farmguard-landing-page";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const goToScan = useCallback(() => navigate("/scan"), [navigate]);
  const goToDashboard = useCallback(() => navigate("/dashboard"), [navigate]);

  return <FarmGuardLandingPage onScanClick={goToScan} onDashboardClick={goToDashboard} />;
};

export default Index;
