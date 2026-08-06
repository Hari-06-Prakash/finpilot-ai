import type { Category } from "../../types/category";

type Props = {
  category?: Category;
};

export default function CategoryBadge({
  category,
}: Props) {
  if (!category) {
    return (
      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
        Unknown
      </span>
    );
  }

  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-medium"
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color || "#2563eb",
      }}
    >
      {category.icon} {category.name}
    </span>
  );
}