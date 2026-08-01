import { useEffect, useState } from "react";

type Props = {
  expense?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

export default function ExpenseForm({
  expense,
  onSubmit,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    merchant: "",
    payment_method: "UPI",
    category_id: 1,
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || "",
        amount: expense.amount?.toString() || "",
        description: expense.description || "",
        merchant: expense.merchant || "",
        payment_method: expense.payment_method || "UPI",
        category_id: expense.category_id || 1,
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        description: "",
        merchant: "",
        payment_method: "UPI",
        category_id: 1,
      });
    }
  }, [expense]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "category_id"
          ? Number(e.target.value)
          : e.target.value,
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

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="merchant"
        placeholder="Merchant"
        value={formData.merchant}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="payment_method"
        value={formData.payment_method}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="UPI">UPI</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
      </select>

      <select
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value={1}>Food</option>
        <option value={2}>Transport</option>
        <option value={3}>Shopping</option>
      </select>

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
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          {expense ? "Update Expense" : "Save Expense"}
        </button>

      </div>

    </form>
  );
}