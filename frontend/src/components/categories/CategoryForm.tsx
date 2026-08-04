import { useEffect, useState } from "react";

type Props = {
  initialData?: {
    name: string;
    icon: string;
    color: string;
  } | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

export default function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    color: "#3B82F6",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        icon: initialData.icon,
        color: initialData.color,
      });
    }
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Category Name
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Food"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Icon
        </label>

        <input
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="🍔"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Color
        </label>

        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-20 h-12 border rounded"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="border px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
}