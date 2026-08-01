import { Pencil, Trash2 } from "lucide-react";

type Props = {
  expense: any;
  onEdit: (expense: any) => void;
  onDelete: (expense: any) => void;
};

export default function ExpenseRow({
  expense,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">
        {expense.title}
      </td>

      <td className="p-4">
        {expense.category_id}
      </td>

      <td className="p-4">
        {expense.payment_method}
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