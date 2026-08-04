import { Search } from "lucide-react";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function CategoryFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="mb-8">

      <div className="relative max-w-md">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full
            pl-12
            pr-4
            py-3.5
            rounded-xl
            border
            border-slate-300
            bg-white
            shadow-sm
            text-slate-700
            placeholder:text-slate-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition-all
            duration-200
          "
        />

      </div>

    </div>
  );
}