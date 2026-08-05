import { useEffect, useState } from "react";
import {
  CreditCard,
  Wallet,
  Smartphone,
  Landmark,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { getPaymentMethodAnalysis } from "../../services/analyticsService";

type PaymentMethod = {
  method: string;
  count: number;
  amount: number;
  percentage: number;
};

type PaymentMethodResponse = {
  payment_methods: PaymentMethod[];
  total_transactions: number;
  most_used: string;
};

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

function getPaymentIcon(method: string) {
  switch (method.toLowerCase()) {
    case "cash":
      return Wallet;

    case "upi":
      return Smartphone;

    case "card":
      return CreditCard;

    case "bank":
    case "bank transfer":
      return Landmark;

    default:
      return CreditCard;
  }
}

export default function PaymentMethodAnalysis() {
  const [data, setData] =
    useState<PaymentMethodResponse | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response =
        await getPaymentMethodAnalysis();

      setData(response);
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex items-center justify-center">
        <p className="text-slate-500">
          Loading Payment Methods...
        </p>
      </div>
    );
  }

  const chartData = data.payment_methods.map(
    (item) => ({
      name: item.method,
      value: item.count,
    })
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Payment Method Analysis
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Distribution of your transactions by payment method.
        </p>

      </div>

      {/* Doughnut Chart */}

      <div className="h-64">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >

              {chartData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="rounded-xl bg-slate-50 p-4 border">

          <p className="text-sm text-slate-500">
            Most Used
          </p>

          <h3 className="text-xl font-bold mt-2">
            {data.most_used}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-50 p-4 border">

          <p className="text-sm text-slate-500">
            Transactions
          </p>

          <h3 className="text-xl font-bold mt-2">
            {data.total_transactions}
          </h3>

        </div>

      </div>
            {/* Payment Method Details */}

      <div className="space-y-5">

        {data.payment_methods.map((item, index) => {

          const Icon = getPaymentIcon(item.method);

          return (

            <div
              key={item.method}
              className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${COLORS[index % COLORS.length]}20`,
                    }}
                  >

                    <Icon
                      size={22}
                      color={COLORS[index % COLORS.length]}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {item.method}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.count} Transactions
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <h3 className="font-bold text-slate-900">
                    ₹
                    {Number(item.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.percentage}%
                  </p>

                </div>

              </div>

              {/* Progress Bar */}

              <div className="mt-4">

                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                </div>

              </div>

            </div>

          );

        })}

      </div>

      {/* Legend */}

      <div className="mt-8 flex flex-wrap gap-4 justify-center">

        {data.payment_methods.map((item, index) => (

          <div
            key={item.method}
            className="flex items-center gap-2"
          >

            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor:
                  COLORS[index % COLORS.length],
              }}
            />

            <span className="text-sm text-slate-600">

              {item.method}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

}