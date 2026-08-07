import {
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  incomes: any[];
  onEdit: (income: any) => void;
  onDelete: (income: any) => void;
};

export default function IncomeTable({
  incomes,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Source
            </th>

            <th className="px-6 py-4 text-left">
              Amount
            </th>

            <th className="px-6 py-4 text-left">
              Payment
            </th>

            <th className="px-6 py-4 text-left">
              Date
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {incomes.map((income) => (

            <tr
              key={income.id}
              className="border-t hover:bg-slate-50"
            >

              {/* Title */}

              <td className="px-6 py-4">

                <div className="font-semibold">
                  {income.title}
                </div>

                <div className="text-sm text-gray-500">
                  {income.description}
                </div>

              </td>

              {/* Source */}

              <td className="px-6 py-4">
                {income.source}
              </td>

              {/* Amount */}

              <td className="px-6 py-4">

                <span className="font-bold text-green-600">
                  ₹
                  {Number(income.amount).toLocaleString()}
                </span>

              </td>

              {/* Payment */}

              <td className="px-6 py-4">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                  {income.payment_method}

                </span>

              </td>

              {/* Date */}

              <td className="px-6 py-4">

                {new Date(
                  income.income_date
                ).toLocaleDateString()}

              </td>

              {/* Actions */}

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(income)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(income)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}