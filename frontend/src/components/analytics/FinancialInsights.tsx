import { useEffect, useState } from "react";
import {
  Trophy,
  Wallet,
  CalendarDays,
  CreditCard,
  Layers3,
} from "lucide-react";

import { getFinancialInsights } from "../../services/analyticsService";

export default function FinancialInsights() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadInsights();
  }, []);

  async function loadInsights() {
    try {
      const response = await getFinancialInsights();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex items-center justify-center">
        <p className="text-slate-500">Loading Financial Insights...</p>
      </div>
    );
  }

  const currency = (value: number | string) =>
    Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const insights = [
    {
      title: "Highest Category",
      value: data.highest_category,
      subValue: `₹${currency(data.highest_category_amount)}`,
      icon: Trophy,
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Largest Expense",
      value: data.largest_expense_title,
      subValue: `₹${currency(data.largest_expense_amount)}`,
      icon: Wallet,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Average Daily",
      value: `₹${currency(data.average_daily_spending)}`,
      subValue: "Current Month",
      icon: CalendarDays,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Payment Method",
      value: data.preferred_payment_method,
      subValue: `${data.preferred_payment_transactions} Transactions (${data.preferred_payment_percentage}%)`,
      icon: CreditCard,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Categories Used",
      value: data.categories_used,
      subValue:
        data.categories_used === 1
          ? "Category"
          : "Categories",
      icon: Layers3,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Financial Insights
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Key insights from your spending behaviour.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`${item.bg} rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    {item.value}
                  </h3>

                  <p className="text-sm text-slate-600 mt-1">
                    {item.subValue}
                  </p>

                </div>

                <div
                  className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ${item.iconColor}`}
                >
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}