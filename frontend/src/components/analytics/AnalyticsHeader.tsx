import { TrendingUp } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

      <div>

        <div className="flex items-center gap-3">

          <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
            <TrendingUp size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Analytics
            </h1>

            <p className="text-slate-500 mt-1">
              Analyze your spending patterns and financial trends.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}