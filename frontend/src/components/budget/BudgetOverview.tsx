import { useEffect, useState } from "react";
import {
  Wallet,
  CreditCard,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

import { budgetService } from "../../services/budgetService";

interface BudgetOverviewData {
  budget: number;
  spent: number;
  remaining: number;
  usage_percentage: number;
  status: string;
  month: number;
  year: number;
}

export default function BudgetOverview() {
  const [overview, setOverview] =
    useState<BudgetOverviewData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBudgetOverview();
  }, []);

  const loadBudgetOverview = async () => {
    try {
      const data =
        await budgetService.getBudgetOverview();

      setOverview(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        Loading Budget Overview...
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        No budget data available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Budget Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Budget */}

        <div className="bg-blue-50 rounded-xl p-5">

          <div className="flex items-center gap-3">

            <Wallet className="text-blue-600" />

            <div>

              <p className="text-slate-500 text-sm">
                Monthly Budget
              </p>

              <h3 className="text-2xl font-bold text-blue-700">
                ₹{overview.budget.toLocaleString()}
              </h3>

            </div>

          </div>

        </div>

        {/* Spent */}

        <div className="bg-red-50 rounded-xl p-5">

          <div className="flex items-center gap-3">

            <CreditCard className="text-red-600" />

            <div>

              <p className="text-slate-500 text-sm">
                Spent
              </p>

              <h3 className="text-2xl font-bold text-red-700">
                ₹{overview.spent.toLocaleString()}
              </h3>

            </div>

          </div>

        </div>

        {/* Remaining */}

        <div className="bg-green-50 rounded-xl p-5">

          <div className="flex items-center gap-3">

            <PiggyBank className="text-green-600" />

            <div>

              <p className="text-slate-500 text-sm">
                Remaining
              </p>

              <h3 className="text-2xl font-bold text-green-700">
                ₹{overview.remaining.toLocaleString()}
              </h3>

            </div>

          </div>

        </div>

        {/* Status */}

        <div className="bg-purple-50 rounded-xl p-5">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-purple-600" />

            <div>

              <p className="text-slate-500 text-sm">
                Status
              </p>

              <h3 className="text-xl font-bold text-purple-700">
                {overview.status}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}