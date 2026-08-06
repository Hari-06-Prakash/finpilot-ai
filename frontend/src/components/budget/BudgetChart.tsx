import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { budgetService } from "../../services/budgetService";

interface BudgetOverview {
  budget: number;
  spent: number;
  remaining: number;
}

export default function BudgetChart() {
  const [budget, setBudget] = useState<BudgetOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    try {
      const data = await budgetService.getBudgetOverview();
      setBudget(data);
    } catch (error) {
      console.error("Error loading chart:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        Loading chart...
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        No budget data found.
      </div>
    );
  }

  const chartData = [
    {
      name: "Spent",
      value: budget.spent,
    },
    {
      name: "Remaining",
      value: budget.remaining,
    },
  ];

  const COLORS = ["#EF4444", "#22C55E"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Budget Distribution
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={55}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
                formatter={(value) => [
                    `₹${Number(value).toLocaleString()}`,
                    "Amount",
                ]}
            />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="bg-red-50 rounded-xl p-4">

          <p className="text-sm text-slate-500">
            Spent
          </p>

          <p className="text-2xl font-bold text-red-600">
            ₹{budget.spent.toLocaleString()}
          </p>

        </div>

        <div className="bg-green-50 rounded-xl p-4">

          <p className="text-sm text-slate-500">
            Remaining
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₹{budget.remaining.toLocaleString()}
          </p>

        </div>

      </div>

    </div>
  );
}