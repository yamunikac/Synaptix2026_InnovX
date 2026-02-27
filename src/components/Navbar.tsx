import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronDown, LogOut, History } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

interface Profile {
  name: string;
  email: string;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("name, email")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data as Profile);
        });
    }
  }, [user]);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-300 bg-white px-6">

      {/* ================= LEFT — SIDEBAR TOGGLE ================= */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* ================= RIGHT — PROFILE ================= */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
              {(profile?.name?.[0] || "U").toUpperCase()}
            </div>

            {/* Username */}
            <span className="text-sm font-medium text-gray-800">
              {profile?.name || "User"}
            </span>

            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ================= DROPDOWN ================= */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-gray-300 bg-white shadow-xl p-4 space-y-4 animate-fade-in z-50">

              {/* Profile Info */}
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  {profile?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {profile?.email}
                </p>
              </div>

              <div className="border-t border-gray-200" />

              {/* View History */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/history");
                }}
                className="flex items-center gap-2 w-full text-sm hover:bg-gray-100 px-3 py-2 rounded-md transition"
              >
                <History className="w-4 h-4" />
                View History
              </button>

              {/* Sign Out */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  signOut();
                }}
                className="flex items-center gap-2 w-full text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}