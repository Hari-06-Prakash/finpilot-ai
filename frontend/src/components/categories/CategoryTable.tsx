import CategoryRow from "./CategoryRow";

type Props = {
  categories: any[];
  onEdit: (category: any) => void;
  onDelete: (category: any) => void;
};

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">
        <tr>
            <th className="text-left p-4 font-semibold text-slate-700">
            Category
            </th>

            <th className="text-left p-4 font-semibold text-slate-700">
            Color
            </th>

            <th className="text-center p-4 font-semibold text-slate-700">
            Actions
            </th>
        </tr>
        </thead>

        <tbody>

          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}