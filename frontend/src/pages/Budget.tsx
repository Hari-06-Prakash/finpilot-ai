import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetOverview from "../components/budget/BudgetOverview";
import BudgetProgress from "../components/budget/BudgetProgress";
import BudgetChart from "../components/budget/BudgetChart";
import BudgetHistory from "../components/budget/BudgetHistory";
import BudgetForm from "../components/budget/BudgetForm";

export default function Budget() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <BudgetHeader />

      {/* Overview */}
      <div className="mt-8">
        <BudgetOverview />
      </div>

      {/* Progress */}
      <div className="mt-8">
        <BudgetProgress />
      </div>

      {/* Chart + History */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <BudgetChart />

        <BudgetHistory />

      </div>

      {/* Update Budget */}
      <div className="mt-8">
        <BudgetForm />
      </div>

    </div>
  );
}
