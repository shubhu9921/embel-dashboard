import React, { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar/Sidebar.jsx";
import Header from "./components/layout/Header/Header.jsx";

import Dashboard from "./pages/Dashboard/DashboardPage.jsx";
import GasPage from "./pages/Dashboard/Gas";
import WaterPage from "./pages/Dashboard/Water";
import EnergyPage from "./pages/Dashboard/Energy";
import SolarPage from "./pages/Dashboard/Solar";
import AnalysisPage from "./pages/Dashboard/Analysis";
import AlertsPage from "./pages/Dashboard/Alerts";
// import DevicesPage from "./pages/Dashboard/Setting.jsx";


export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main content - Margin adjusted for fixed Sidebar */}
      <div
        className={`flex flex-col flex-1 overflow-hidden relative transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"
          }`}
      >
        {/* Header */}
        <Header
          onMenuClick={() => setCollapsed(!collapsed)}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto w-full">
          {activePage === "Dashboard" && <Dashboard />}
          {/* {activePage === "Users" && <Users />} */}
          {activePage === "Gas" && <GasPage />}
          {activePage === "Water" && <WaterPage />}
          {activePage === "Energy" && <EnergyPage />}
          {activePage === "Solar" && <SolarPage />}
          {/* {activePage === "Devices" && <DevicesPage />} */}
          {activePage === "Alerts" && <AlertsPage />}
          {activePage === "Analysis" && <AnalysisPage />}

        </main>
      </div>
    </div>
  );
}
