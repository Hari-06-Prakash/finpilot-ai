import MonthlyTrendChart from "../dashboard/MonthlyTrendChart";

export default function AnalyticsMonthlyTrend() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-slate-800">
          Monthly Spending Trend
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Track how your expenses change over time.
        </p>

      </div>

      <MonthlyTrendChart />

    </div>
  );
}