import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Globe,
  Award,
  BarChart3,
  History,
  Trophy,
  LogOut
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Assessments", icon: ClipboardList, path: "/assessments" },
    { name: "Global Platforms", icon: Globe, path: "/global-platforms" },
    { name: "Certifications", icon: Award, path: "/certifications" },
    { name: "Overall Report", icon: BarChart3, path: "/report" },
    { name: "History", icon: History, path: "/history" },
    { name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-300 fixed left-0 top-0 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-gray-300">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-sm">
          ED
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold text-gray-800">
            EduPlus
          </span>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        {menu.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-all rounded-md ${
                active
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-300 p-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 w-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
}