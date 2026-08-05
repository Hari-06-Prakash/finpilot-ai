import { useEffect, useState } from "react";

import { getDashboardSummary } from "../../services/dashboardService";

import SummaryCards from "../dashboard/SummaryCards";

export default function AnalyticsSummary() {
  const [summary, setSummary] =useState<any>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!summary) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-slate-500">
        Loading analytics...
      </div>
    );
  }

  return <SummaryCards summary={summary} />;
}