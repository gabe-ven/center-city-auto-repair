"use client";
import { LayoutDashboard, Ticket, CalendarDays, Bell, ChevronLeft, ChevronRight, Wrench } from "lucide-react";

export type ViewType = "home" | "tickets" | "calendar" | "notifications";

interface Props {
  view: ViewType;
  onView: (v: ViewType) => void;
  collapsed: boolean;
  onToggle: () => void;
  notificationCount: number;
}

const NAV = [
  { id: "home" as ViewType,          icon: LayoutDashboard, label: "Overview" },
  { id: "tickets" as ViewType,       icon: Ticket,          label: "Tickets" },
  { id: "calendar" as ViewType,      icon: CalendarDays,    label: "Calendar" },
  { id: "notifications" as ViewType, icon: Bell,            label: "Alerts" },
];

export function Sidebar({ view, onView, collapsed, onToggle, notificationCount }: Props) {
  return (
    <aside className={`relative flex flex-col bg-[#0a0a0a] border-r border-neutral-800 transition-all duration-200 ${collapsed ? "w-14" : "w-56"}`}>
      {/* Brand */}
      <div className={`flex items-center gap-3 px-3 py-4 border-b border-neutral-800 ${collapsed ? "justify-center" : ""}`}>
        <div className="flex-shrink-0 w-8 h-8 bg-[#27bcd9] rounded flex items-center justify-center">
          <Wrench className="w-4 h-4 text-black" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-white text-xs font-black uppercase tracking-wider leading-tight">Center City</div>
            <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">Auto Repair</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {NAV.map(({ id, icon: Icon, label }) => {
          const active = view === id;
          return (
            <button
              key={id}
              onClick={() => onView(id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                active ? "bg-[#27bcd9]/10 text-[#27bcd9]" : "text-neutral-400 hover:text-white hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`}
            >
              {active && <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#27bcd9] rounded-r" />}
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
              {id === "notifications" && notificationCount > 0 && (
                <span className={`ml-auto text-[10px] font-bold bg-[#27bcd9] text-black rounded-full px-1.5 py-0.5 ${collapsed ? "absolute top-1 right-1 px-1" : ""}`}>
                  {notificationCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-16 w-6 h-6 bg-[#0a0a0a] border border-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
