import { useEffect, useState } from "react";

import { getDashboardSummary } from "../services/dashboardService";

import SummaryCards from "../components/dashboard/SummaryCards";
import CategoryPieChart from "../components/dashboard/CategoryChart";
import MonthlyTrendChart from "../components/dashboard/MonthlyTrendChart";
import RecentExpensesTable from "../components/dashboard/RecentExpenses";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {summary && <SummaryCards summary={summary} />}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <CategoryPieChart />

        <MonthlyTrendChart />

      </div>

      <div className="mt-8">

        <RecentExpensesTable />

      </div>

    </div>
  );
}