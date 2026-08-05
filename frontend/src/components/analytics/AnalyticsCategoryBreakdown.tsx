import CategoryPieChart from "../dashboard/CategoryChart";

export default function AnalyticsCategoryBreakdown() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-slate-800">
          Category Breakdown
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          See how your spending is distributed across different categories.
        </p>

      </div>

      <CategoryPieChart />

    </div>
  );
}