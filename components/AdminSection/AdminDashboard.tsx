"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Sidebar, type ViewType } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { OverviewView } from "./views/OverviewView";
import { TicketsView } from "./views/TicketsView";
import { useTickets } from "./hooks/useTickets";

export function AdminDashboard() {
  const [view, setView] = useState<ViewType>("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { tickets, loading, reload, optimisticStatusUpdate } = useTickets();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("ccar-dark");
    if (saved === "1") { setDarkMode(true); document.documentElement.classList.add("dark"); }
  }, []);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("no-transitions", true);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ccar-dark", next ? "1" : "0");
    setTimeout(() => document.documentElement.classList.remove("no-transitions"), 50);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const newCount = tickets.filter((t) => t.status === "received").length;

  const VIEW_TITLES: Record<ViewType, string> = {
    home: "Overview", tickets: "Tickets", calendar: "Calendar", notifications: "Alerts",
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-white overflow-hidden">
      <Sidebar view={view} onView={setView} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} notificationCount={newCount} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar tickets={tickets} darkMode={darkMode} onDarkMode={toggleDark} onLogout={handleLogout} title={VIEW_TITLES[view]} />
        <main className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm font-mono">Loading…</div>
          ) : view === "home" ? (
            <OverviewView tickets={tickets} />
          ) : view === "tickets" ? (
            <TicketsView tickets={tickets} onStatusChange={optimisticStatusUpdate} onReload={reload} />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm font-mono">Coming soon</div>
          )}
        </main>
      </div>
    </div>
  );
}
