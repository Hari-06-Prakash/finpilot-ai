type Props = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: Props) {
  if (totalItems === 0) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

      <div className="text-sm text-gray-600">
        Showing <strong>{start}</strong> - <strong>{end}</strong> of{" "}
        <strong>{totalItems}</strong> expenses
      </div>

      <div className="flex items-center gap-2">

        <span className="text-sm text-gray-600">
          Rows per page
        </span>

        <select
          value={itemsPerPage}
          onChange={(e) =>
            onItemsPerPageChange(Number(e.target.value))
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>

      </div>

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          →
        </button>

      </div>

    </div>
  );
}