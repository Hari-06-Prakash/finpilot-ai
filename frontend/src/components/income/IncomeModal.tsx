import IncomeForm from "./IncomeForm";

type Props = {
  open: boolean;
  income?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function IncomeModal({
  open,
  income,
  onClose,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {income ? "Edit Income" : "Add Income"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            ✕
          </button>

        </div>

        <IncomeForm
          income={income}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  );
}