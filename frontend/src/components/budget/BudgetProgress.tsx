import { useEffect, useState } from "react";
import { budgetService } from "../../services/budgetService";

interface BudgetOverview {
  budget: number;
  spent: number;
  remaining: number;
  usage_percentage: number;
  status: string;
}

export default function BudgetProgress() {
  const [budget, setBudget] = useState<BudgetOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBudget();
  }, []);

  async function loadBudget() {
    try {
      const data = await budgetService.getBudgetOverview();
      setBudget(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        Loading...
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        No Budget Found
      </div>
    );
  }

  const used = budget.usage_percentage;
  const remaining = 100 - used;

  let progressColor = "bg-green-500";

  if (used >= 80) {
    progressColor = "bg-red-500";
  } else if (used >= 60) {
    progressColor = "bg-yellow-500";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Budget Usage
      </h2>

      <div className="flex justify-between mb-2">

        <span className="font-medium text-slate-600">
          Used
        </span>

        <span className="font-bold">
          {used.toFixed(2)}%
        </span>

      </div>

      <div className="w-full bg-slate-200 rounded-full h-5 overflow-hidden">

        <div
          className={`${progressColor} h-5 rounded-full transition-all duration-500`}
          style={{
            width: `${used}%`,
          }}
        />

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <div>

          <p className="text-slate-500">
            Amount Used
          </p>

          <h3 className="text-2xl font-bold text-red-600">
            ₹{budget.spent.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-slate-500">
            Remaining
          </p>

          <h3 className="text-2xl font-bold text-green-600">
            ₹{budget.remaining.toLocaleString()}
          </h3>

        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Remaining Budget
          </span>

          <span className="font-semibold">
            {remaining.toFixed(2)}%
          </span>

        </div>

      </div>

    </div>
  );
}