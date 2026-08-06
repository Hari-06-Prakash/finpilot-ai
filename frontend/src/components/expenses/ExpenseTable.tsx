import ExpenseRow from "./ExpenseRow";
import type { Category } from "../../types/category";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category_id: number;
  payment_method: string;
  expense_date: string;
};

type Props = {
  expenses: Expense[];
  categories: Category[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

export default function ExpenseTable({
  expenses,
  categories,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Payment</th>
            <th className="text-left p-4">Amount</th>
            <th className="text-left p-4">Date</th>
            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>

          {expenses.map((expense) => (

            <ExpenseRow
              key={expense.id}
              expense={expense}
              categories={categories}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}