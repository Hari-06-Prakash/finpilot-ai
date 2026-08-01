type Props = {
  search: string;
  category: string;
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
};

export default function ExpenseFilters({
  search,
  category,
  dateFilter,
  onSearchChange,
  onCategoryChange,
  onDateFilterChange,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">

      <input
        type="text"
        placeholder="🔍 Search expenses..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded-lg px-4 py-3"
      >
        <option value="">All Categories</option>
        <option value="1">🍔 Food</option>
        <option value="2">🚌 Transport</option>
        <option value="3">🛍 Shopping</option>
      </select>

      <select
        value={dateFilter}
        onChange={(e) => onDateFilterChange(e.target.value)}
        className="border rounded-lg px-4 py-3"
      >
        <option value="all">📅 All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>

    </div>
  );
}