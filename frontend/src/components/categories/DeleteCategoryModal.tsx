type Props = {
  open: boolean;
  category: any;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteCategoryModal({
  open,
  category,
  onClose,
  onDelete,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Delete Category
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <strong>{category?.name}</strong>?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}