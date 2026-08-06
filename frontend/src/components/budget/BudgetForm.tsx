import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { budgetService } from "../../services/budgetService";

export default function BudgetForm() {
  const [budgetAmount, setBudgetAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCurrentBudget();
  }, []);

  async function loadCurrentBudget() {
    try {
      const data = await budgetService.getCurrentBudget();

      if (data) {
        setBudgetAmount(data.budget_amount.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!budgetAmount) {
      setMessage("Please enter a budget amount.");
      return;
    }

    try {
      setLoading(true);

      await budgetService.createBudget(
        Number(budgetAmount)
      );

      setMessage("✅ Budget updated successfully.");

      // Refresh current budget
      loadCurrentBudget();

      // Reload page after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to update budget.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Set Monthly Budget
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block text-sm font-medium text-slate-600 mb-2">
            Monthly Budget
          </label>

          <input
            type="number"
            min="0"
            placeholder="Enter monthly budget"
            value={budgetAmount}
            onChange={(e) =>
              setBudgetAmount(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 font-semibold transition flex justify-center items-center gap-2 disabled:opacity-50"
        >

          <Save size={18} />

          {loading
            ? "Saving..."
            : "Save Budget"}

        </button>

      </form>

      {message && (

        <div className="mt-5 text-center font-medium">

          {message}

        </div>

      )}

    </div>
  );
}