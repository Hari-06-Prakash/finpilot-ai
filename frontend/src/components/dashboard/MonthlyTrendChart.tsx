import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getMonthlyTrend } from "../../services/dashboardService";

type TrendData = {
  month: string;
  amount: number;
};

export default function MonthlyTrendChart() {
  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const result = await getMonthlyTrend();

      const formatted = result.map((item: any) => ({
        month: item.month,
        amount: Number(item.amount),
      }));

      setData(formatted);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563EB"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}