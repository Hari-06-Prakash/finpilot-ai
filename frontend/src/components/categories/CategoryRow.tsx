import { Pencil, Trash2 } from "lucide-react";

type Props = {
  category: any;
  onEdit: (category: any) => void;
  onDelete: (category: any) => void;
};

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
}: Props) {
  const color = category.color || "#3B82F6";

  const colorNames: Record<string, string> = {
    "#3B82F6": "Blue",
    "#10B981": "Green",
    "#EF4444": "Red",
    "#F59E0B": "Amber",
    "#F97316": "Orange",
    "#8B5CF6": "Purple",
    "#EC4899": "Pink",
    "#06B6D4": "Cyan",
    "#6366F1": "Indigo",
    "#64748B": "Slate",
    "#6B7280": "Gray",
  };

  return (
    <tr className="border-b hover:bg-slate-50 transition-colors duration-200">

      {/* Category */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {category.icon}
          </span>

          <span className="font-medium text-slate-800">
            {category.name}
          </span>
        </div>
      </td>

      {/* Color */}
      <td className="p-4">
        <div className="flex items-center">

          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${color}20`,
              color: color,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: color,
              }}
            />

            {colorNames[color] || "Custom"}
          </span>

        </div>
      </td>

      {/* Actions */}
        <td className="p-4">
        <div className="flex justify-center gap-3">

            <button
            title="Edit Category"
            onClick={() => onEdit(category)}
            className="
                p-2.5
                rounded-lg
                bg-blue-50
                text-blue-600
                hover:bg-blue-100
                hover:scale-105
                transition-all
                duration-200
                shadow-sm
            "
            >
            <Pencil size={18} />
            </button>

            <button
            title="Delete Category"
            onClick={() => onDelete(category)}
            className="
                p-2.5
                rounded-lg
                bg-red-50
                text-red-600
                hover:bg-red-100
                hover:scale-105
                transition-all
                duration-200
                shadow-sm
            "
            >
            <Trash2 size={18} />
            </button>

        </div>
        </td>

    </tr>
  );
}