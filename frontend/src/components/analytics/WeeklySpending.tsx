import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Wallet,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { getWeeklySpending } from "../../services/analyticsService";

type WeeklyItem = {
  day: string;
  amount: number;
};

type WeeklyResponse = {
  weekly_spending: WeeklyItem[];
  total_spending: number;
  average_spending: number;
  highest_day: string;
  highest_amount: number;
  lowest_day: string;
  lowest_amount: number;
};

export default function WeeklySpending() {
  const [data, setData] =
    useState<WeeklyResponse | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response =
        await getWeeklySpending();

      setData(response);
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Weekly Spending
        </h2>

        <p className="text-slate-500 mt-1">
          Spending overview for the last seven days.
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="rounded-xl border bg-slate-50 p-4">

          <Wallet
            className="text-blue-600 mb-2"
            size={22}
          />

          <p className="text-sm text-slate-500">
            Total Spending
          </p>

          <h3 className="text-2xl font-bold mt-2">
            ₹
            {Number(
              data.total_spending
            ).toLocaleString("en-IN")}
          </h3>

        </div>

        <div className="rounded-xl border bg-slate-50 p-4">

          <Calendar
            className="text-green-600 mb-2"
            size={22}
          />

          <p className="text-sm text-slate-500">
            Daily Average
          </p>

          <h3 className="text-2xl font-bold mt-2">
            ₹
            {Number(
              data.average_spending
            ).toLocaleString("en-IN")}
          </h3>

        </div>

        <div className="rounded-xl border bg-slate-50 p-4">

          <TrendingUp
            className="text-red-600 mb-2"
            size={22}
          />

          <p className="text-sm text-slate-500">
            Highest Day
          </p>

          <h3 className="text-lg font-bold mt-2">
            {data.highest_day}
          </h3>

          <p className="text-sm text-slate-500">
            ₹
            {Number(
              data.highest_amount
            ).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="rounded-xl border bg-slate-50 p-4">

          <TrendingDown
            className="text-green-600 mb-2"
            size={22}
          />

          <p className="text-sm text-slate-500">
            Lowest Day
          </p>

          <h3 className="text-lg font-bold mt-2">
            {data.lowest_day}
          </h3>

          <p className="text-sm text-slate-500">
            ₹
            {Number(
              data.lowest_amount
            ).toLocaleString("en-IN")}
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="h-72">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data.weekly_spending}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>
            {/* Weekly Summary Table */}

      <div className="mt-8">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-lg font-semibold text-slate-800">
            Daily Spending Summary
          </h3>

          <span className="text-sm text-slate-500">
            Last 7 Days
          </span>

        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">
                  Day
                </th>

                <th className="px-5 py-3 text-right text-sm font-semibold text-slate-700">
                  Amount
                </th>

                <th className="px-5 py-3 text-right text-sm font-semibold text-slate-700">
                  % of Week
                </th>

              </tr>

            </thead>

            <tbody>

              {data.weekly_spending.map((item) => {

                const percentage =
                  data.total_spending > 0
                    ? (
                        (item.amount /
                          data.total_spending) *
                        100
                      ).toFixed(1)
                    : "0.0";

                return (

                  <tr
                    key={item.day}
                    className="border-t hover:bg-slate-50 transition-colors"
                  >

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {item.day}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold">
                      ₹
                      {Number(
                        item.amount
                      ).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">

                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          Number(percentage) === 0
                            ? "bg-slate-100 text-slate-600"
                            : Number(percentage) >= 50
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {percentage}%
                      </span>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">

          <h3 className="text-lg font-semibold text-blue-900">
            Weekly Insight
          </h3>

          <p className="mt-2 text-sm text-blue-800">

            Highest spending occurred on{" "}
            <strong>{data.highest_day}</strong>
            {" "}with{" "}
            <strong>
              ₹
              {Number(
                data.highest_amount
              ).toLocaleString("en-IN")}
            </strong>.

            {" "}The lowest spending day was{" "}
            <strong>{data.lowest_day}</strong>.

          </p>

        </div>

      </div>
    </div>
  );
}