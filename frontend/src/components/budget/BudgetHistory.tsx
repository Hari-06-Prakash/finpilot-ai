import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { budgetService } from "../../services/budgetService";

interface BudgetHistoryItem {
  month: number;
  year: number;
  budget_amount: number;
}

export default function BudgetHistory() {
  const [history, setHistory] = useState<BudgetHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await budgetService.getBudgetHistory();
      setHistory(data);
    } catch (error) {
      console.error("Error loading budget history:", error);
    } finally {
      setLoading(false);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">

      <div className="flex items-center gap-3 mb-6">

        <Calendar className="text-blue-600" size={28} />

        <h2 className="text-2xl font-bold text-slate-800">
          Budget History
        </h2>

      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">
          Loading...
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          No budget history found.
        </div>
      ) : (
        <div className="space-y-4">

          {history.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
            >

              <div>

                <p className="font-semibold text-slate-700">
                  {monthNames[item.month - 1]} {item.year}
                </p>

                <p className="text-sm text-slate-500">
                  Monthly Budget
                </p>

              </div>

              <div className="text-right">

                <p className="text-xl font-bold text-emerald-600">
                  ₹{Number(item.budget_amount).toLocaleString()}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}