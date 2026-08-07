import { useEffect, useState } from "react";

type Props = {
  income?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

export default function IncomeForm({
  income,
  onSubmit,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    source: "",
    description: "",
    payment_method: "Bank Transfer",
    income_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (income) {
      setFormData({
        title: income.title || "",
        amount: income.amount?.toString() || "",
        source: income.source || "",
        description: income.description || "",
        payment_method: income.payment_method || "Bank Transfer",
        income_date:
          income.income_date ||
          new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        source: "",
        description: "",
        payment_method: "Bank Transfer",
        income_date: new Date().toISOString().split("T")[0],
      });
    }
  }, [income]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Title */}

      <input
        name="title"
        placeholder="Income Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      {/* Amount */}

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      {/* Source */}

      <input
        name="source"
        placeholder="Income Source"
        value={formData.source}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      {/* Description */}

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className="w-full border rounded-lg p-3 resize-none"
      />

      {/* Payment Method */}

      <select
        name="payment_method"
        value={formData.payment_method}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Bank Transfer">🏦 Bank Transfer</option>
        <option value="Cash">💵 Cash</option>
        <option value="UPI">📱 UPI</option>
        <option value="Cheque">🧾 Cheque</option>
      </select>

      {/* Income Date */}

      <input
        type="date"
        name="income_date"
        value={formData.income_date}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          {income ? "Update Income" : "Save Income"}
        </button>

      </div>

    </form>
  );
}