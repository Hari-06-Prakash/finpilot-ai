import ExpenseForm from "./ExpenseForm";

type Props = {
  open: boolean;
  expense?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function ExpenseModal({
  open,
  expense,
  onClose,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          {expense ? "Edit Expense" : "Add Expense"}
        </h2>

        <ExpenseForm
          expense={expense}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  );
}