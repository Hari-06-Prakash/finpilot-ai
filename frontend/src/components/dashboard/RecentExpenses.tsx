import { useEffect, useState } from "react";
import { getRecentExpenses } from "../../services/dashboardService";

type Expense = {
  id: number;
  title: string;
  amount: number;
  expense_date: string;
};

export default function RecentExpensesTable() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const data = await getRecentExpenses();

      const formatted = data.map((item: any) => ({
        ...item,
        amount: Number(item.amount),
      }));

      setExpenses(formatted);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-6">
        Recent Expenses
      </h2>

      <table className="w-full">

        <thead className="border-b">

          <tr>
            <th className="text-left py-3">Title</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Date</th>
          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr
              key={expense.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-4">
                {expense.title}
              </td>

              <td>
                ₹{expense.amount.toFixed(2)}
              </td>

              <td>
                {new Date(
                  expense.expense_date
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}