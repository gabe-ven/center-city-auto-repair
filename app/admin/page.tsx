import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import { AdminDashboard } from "@/components/AdminSection/AdminDashboard";

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return <AdminDashboard />;
}
