import { cookies } from "next/headers";
import { verifyToken } from "@/lib/admin/auth";
import { getAdminStats, getAdminLeads, getAdminVisits, getAdminProposals } from "@/lib/admin/db";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  const isAuthenticated = token ? verifyToken(token) !== null : false;

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Fetch data in parallel for high performance
  const [stats, leads, visits, proposals] = await Promise.all([
    getAdminStats(),
    getAdminLeads(),
    getAdminVisits(),
    getAdminProposals(),
  ]);

  return (
    <Dashboard
      stats={stats}
      leads={leads}
      visits={visits}
      proposals={proposals}
    />
  );
}
