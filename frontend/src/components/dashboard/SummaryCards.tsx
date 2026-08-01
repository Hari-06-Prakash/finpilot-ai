type SummaryProps = {
  summary: {
    total_expenses: string;
    this_month: string;
    total_transactions: number;
    average_transaction: string;
  };
};

export default function SummaryCards({ summary }: SummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">
          Total Expenses
        </h3>

        <p className="text-3xl font-bold mt-3 text-blue-600">
          ₹ {summary.total_expenses}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">
          This Month
        </h3>

        <p className="text-3xl font-bold mt-3 text-green-600">
          ₹ {summary.this_month}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">
          Transactions
        </h3>

        <p className="text-3xl font-bold mt-3 text-purple-600">
          {summary.total_transactions}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">
          Average Transaction
        </h3>

        <p className="text-3xl font-bold mt-3 text-orange-600">
          ₹ {Number(summary.average_transaction).toFixed(2)}
        </p>
      </div>

    </div>
  );
}