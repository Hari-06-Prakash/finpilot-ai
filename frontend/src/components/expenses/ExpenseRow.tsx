import { Pencil, Trash2 } from "lucide-react";

type Props = {
  expense: any;
  onEdit: (expense: any) => void;
  onDelete: (expense: any) => void;
};

const categoryMap: Record<number, string> = {
  1: "🍔 Food",
  2: "🚌 Transport",
  3: "🛍 Shopping",
};

export default function ExpenseRow({
  expense,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-b hover:bg-slate-50 transition">

      <td className="p-4 font-medium">
        {expense.title}
      </td>

      <td className="p-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {categoryMap[expense.category_id] ?? "Other"}
        </span>
      </td>

      <td className="p-4">
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {expense.payment_method}
        </span>
      </td>

      <td className="p-4 font-semibold text-green-600">
        ₹ {Number(expense.amount).toFixed(2)}
      </td>

      <td className="p-4">
        {new Date(expense.expense_date).toLocaleDateString()}
      </td>

      <td className="p-4">
        <div className="flex justify-center gap-4">

          <button
            onClick={() => onEdit(expense)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(expense)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}