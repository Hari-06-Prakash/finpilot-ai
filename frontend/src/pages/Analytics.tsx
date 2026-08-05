import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import AnalyticsMonthlyTrend from "../components/analytics/AnalyticsMonthlyTrend";
import AnalyticsCategoryBreakdown from "../components/analytics/AnalyticsCategoryBreakdown";
import TopCategories from "../components/analytics/TopCategories";
import MonthlyComparison from "../components/analytics/MonthlyComparison";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <AnalyticsHeader />

      <div className="mt-8">
        <AnalyticsSummary />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <AnalyticsMonthlyTrend />

        <AnalyticsCategoryBreakdown />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <TopCategories />

        <MonthlyComparison />

      </div>

    </div>
  );
}