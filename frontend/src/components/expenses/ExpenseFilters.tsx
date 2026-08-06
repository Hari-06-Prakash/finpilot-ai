import useCategories from "../../hooks/useCategories";

type Props = {
  search: string;
  category: string;
  dateFilter: string;

  fromDate: string;
  toDate: string;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;

  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
};

export default function ExpenseFilters({
  search,
  category,
  dateFilter,
  fromDate,
  toDate,

  onSearchChange,
  onCategoryChange,
  onDateFilterChange,

  onFromDateChange,
  onToDateChange,
}: Props) {
  const { categories, loading } = useCategories();

  return (
    <div className="space-y-4 mb-6">

      {/* Row 1 */}

      <div className="flex flex-col lg:flex-row gap-4">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border rounded-lg px-4 py-3 min-w-[220px]"
        >
          <option value="">All Categories</option>

          {!loading &&
            categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.icon} {cat.name}
              </option>
            ))}
        </select>

        {/* Date Filter */}

        <select
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className="border rounded-lg px-4 py-3 min-w-[180px]"
        >
          <option value="all">📅 All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom Range</option>
        </select>

      </div>

      {/* Row 2 */}

      {dateFilter === "custom" && (
        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex flex-col w-full">

            <label className="text-sm font-medium mb-1">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                onFromDateChange(e.target.value)
              }
              className="border rounded-lg px-4 py-3"
            />

          </div>

          <div className="flex flex-col w-full">

            <label className="text-sm font-medium mb-1">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                onToDateChange(e.target.value)
              }
              className="border rounded-lg px-4 py-3"
            />

          </div>

        </div>
      )}

    </div>
  );
}