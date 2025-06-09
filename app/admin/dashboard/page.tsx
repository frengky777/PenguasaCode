import { getDashboardData } from "@/lib/fetchDashboard";
import DashboardPage from "./DashboardPage";

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return <DashboardPage initialData={data} />;
};