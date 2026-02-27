import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import AIChatWidget from "@/components/AIChatWidget";

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

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content Area */}
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

                {/* Landing Page (No Layout) */}
                <Route path="/" element={<Landing1 />} />

                {/* Auth Page (No Layout) */}
                <Route path="/auth" element={<AuthPage />} />

                {/* App Pages (With Sidebar + Navbar) */}
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
                  path="/leaderboard"
                  element={
                    <AppLayout>
                      <LeaderboardPage />
                    </AppLayout>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Landing1 />} />

              </Routes>

              <AIChatWidget />
            </HashRouter>

          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;