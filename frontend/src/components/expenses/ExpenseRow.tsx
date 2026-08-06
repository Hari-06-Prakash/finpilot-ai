import { Pencil, Trash2 } from "lucide-react";
import CategoryBadge from "../common/CategoryBadge";
import type { Category } from "../../types/category";

type Props = {
  expense: any;
  categories: Category[];
  onEdit: (expense: any) => void;
  onDelete: (expense: any) => void;
};

export default function ExpenseRow({
  expense,
  categories,
  onEdit,
  onDelete,
}: Props) {

  const category = categories.find(
    (cat) => cat.id === expense.category_id
  );

  return (
    <tr className="border-b hover:bg-slate-50 transition">

      <td className="p-4 font-medium">
        {expense.title}
      </td>

      <td className="p-4">
        <CategoryBadge category={category} />
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