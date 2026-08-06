import { Wallet } from "lucide-react";

export default function BudgetHeader() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex items-center gap-4">

        <div className="bg-emerald-100 p-3 rounded-xl">

          <Wallet
            size={32}
            className="text-emerald-600"
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Budget Planner
          </h1>

          <p className="text-slate-500 mt-1">
            Set monthly budgets, monitor spending, and stay in control of your finances.
          </p>

        </div>

      </div>

    </div>
  );
}