import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import GlobalPlatformPage from "./pages/GlobalPlatformPage";
import CertificationsPage from "./pages/CertificationsPage";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";

import Landing1 from "./pages/Landing1";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import TestPage from "./pages/TestPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";

const queryClient = new QueryClient();

/* ================= LAYOUT WRAPPER ================= */

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} />

      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/* ================= MAIN APP ================= */

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <HashRouter>
              <Routes>

                <Route path="/" element={<Landing1 />} />
                <Route path="/auth" element={<AuthPage />} />

                <Route
                  path="/dashboard"
                  element={
                    <AppLayout>
                      <DashboardPage />
                    </AppLayout>
                  }
                />

                <Route
                  path="/test"
                  element={
                    <AppLayout>
                      <TestPage />
                    </AppLayout>
                  }
                />

                <Route
                  path="/results/:id"
                  element={
                    <AppLayout>
                      <ResultsPage />
                    </AppLayout>
                  }
                />

                <Route
                  path="/history"
                  element={
                    <AppLayout>
                      <HistoryPage />
                    </AppLayout>
                  }
                />

                <Route
                  path="/report"
                  element={
                    <AppLayout>
                      <HistoryPage />
                    </AppLayout>
                  }
                />

                <Route
                  path="/leaderboard"
                  element={
                    <AppLayout>
                      <LeaderboardPage />
                    </AppLayout>
                  }
                />

                <Route
                  path="/global-platforms"
                  element={
                    <AppLayout>
                      <GlobalPlatformPage />
                    </AppLayout>
                  }
                />

                <Route
                  path="/certifications"
                  element={
                    <AppLayout>
                      <CertificationsPage />
                    </AppLayout>
                  }
                />

                <Route path="*" element={<Landing1 />} />

              </Routes>
            </HashRouter>

          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;