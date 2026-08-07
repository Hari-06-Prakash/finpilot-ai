import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type Props = {
  search: string;
  paymentMethod: string;
  dateFilter: string;
  startDate: string;
  endDate: string;
  categories: Category[];
  category: string;

  onSearchChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

export default function IncomeFilters({
  search,
  paymentMethod,
  category,
  dateFilter,
  startDate,
  endDate,
  categories,
  onSearchChange,
  onPaymentMethodChange,
  onCategoryChange,
  onDateFilterChange,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  const [showCustomDate, setShowCustomDate] = useState(false);

  useEffect(() => {
    setShowCustomDate(dateFilter === "custom");
  }, [dateFilter]);

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search income..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border rounded-lg px-4 py-3"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        {/* Payment */}

        <select
          value={paymentMethod}
          onChange={(e) =>
            onPaymentMethodChange(e.target.value)
          }
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Payments</option>

          <option value="Cash">
            Cash
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="Card">
            Card
          </option>

          <option value="Bank Transfer">
            Bank Transfer
          </option>
        </select>

        {/* Date */}

        <select
          value={dateFilter}
          onChange={(e) =>
            onDateFilterChange(e.target.value)
          }
          className="border rounded-lg px-4 py-3"
        >
          <option value="all">All Time</option>

          <option value="today">Today</option>

          <option value="week">This Week</option>

          <option value="month">This Month</option>

          <option value="custom">
            Custom Date
          </option>
        </select>

      </div>

      {showCustomDate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

          <div>

            <label className="block text-sm font-medium mb-1">
              From
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                onStartDateChange(e.target.value)
              }
              className="border rounded-lg px-4 py-3 w-full"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              To
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                onEndDateChange(e.target.value)
              }
              className="border rounded-lg px-4 py-3 w-full"
            />

          </div>

        </div>
      )}

    </div>
  );
}