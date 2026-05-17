"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Wrench } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); return; }
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 bg-[#27bcd9] rounded flex items-center justify-center">
            <Wrench className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="text-white font-black uppercase tracking-wider text-sm" style={{ fontFamily: "Anton, sans-serif" }}>Center City</div>
            <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">Auto Repair · Admin</div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="bg-[#111] border border-neutral-800 rounded-xl p-8 space-y-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
            />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
            />
          </div>
          {error && <p className="text-red-400 text-sm font-mono">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#27bcd9] text-black font-black uppercase tracking-widest text-sm rounded-lg hover:bg-[#1aa5c2] disabled:opacity-50 transition-colors">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
