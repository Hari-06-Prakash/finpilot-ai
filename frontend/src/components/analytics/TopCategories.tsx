import { useEffect, useState } from "react";

import { getCategorySummary } from "../../services/dashboardService";

export default function TopCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategorySummary();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  const total = categories.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-xl font-semibold text-slate-800">
        Top Spending Categories
      </h2>

      <p className="text-sm text-slate-500 mt-1 mb-6">
        Your highest spending categories.
      </p>

      <div className="space-y-6">

        {categories.map((item, index) => {
          const percentage =
            total === 0
              ? 0
              : (Number(item.amount) / total) * 100;

          return (
            <div key={item.category}>

              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-3">

                  <span className="text-lg">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : "📊"}
                  </span>

                  <span className="font-medium">
                    {item.category}
                  </span>

                </div>

                <span className="font-semibold text-slate-700">
                  ₹ {item.amount}
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <div className="text-right text-xs text-slate-500 mt-1">
                {percentage.toFixed(1)}%
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}