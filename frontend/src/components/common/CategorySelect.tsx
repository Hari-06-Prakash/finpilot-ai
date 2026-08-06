import useCategories from "../../hooks/useCategories";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function CategorySelect({
  value,
  onChange,
}: Props) {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <select
        className="w-full border rounded-lg p-3"
        disabled
      >
        <option>Loading categories...</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(Number(e.target.value))
      }
      className="w-full border rounded-lg p-3"
    >
      {categories.map((category) => (
        <option
          key={category.id}
          value={category.id}
        >
          {category.icon ?? "📁"} {category.name}
        </option>
      ))}
    </select>
  );
}