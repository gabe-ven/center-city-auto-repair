"use client";
import { Search, Bell, Sun, Moon, LogOut } from "lucide-react";
import type { Ticket } from "../types/admin";

interface Props {
  tickets: Ticket[];
  darkMode: boolean;
  onDarkMode: () => void;
  onLogout: () => void;
  title: string;
}

export function TopBar({ tickets, darkMode, onDarkMode, onLogout, title }: Props) {
  const newCount = tickets.filter((t) => t.status === "received").length;

  return (
    <header className="flex items-center gap-4 px-6 h-14 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] flex-shrink-0">
      <div className="font-black uppercase tracking-widest text-sm text-[#0a0a0a] dark:text-white">{title}</div>
      <div className="flex-1" />
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
        <input
          placeholder="Search tickets…"
          className="pl-8 pr-3 py-1.5 text-sm rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 w-52 focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
        />
      </div>
      <button className="relative p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-white">
        <Bell className="w-4 h-4" />
        {newCount > 0 && (
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#27bcd9] rounded-full" />
        )}
      </button>
      <button onClick={onDarkMode} className="p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-white">
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <button onClick={onLogout} className="p-1.5 text-neutral-500 hover:text-red-500">
        <LogOut className="w-4 h-4" />
      </button>
    </header>
  );
}
