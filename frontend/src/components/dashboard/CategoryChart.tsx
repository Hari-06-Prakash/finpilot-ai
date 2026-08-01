import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getCategorySummary } from "../../services/dashboardService";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
];

export default function CategoryPieChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const result = await getCategorySummary();

      const formatted = result.map((item: any) => ({
        name: item.category,
        value: Number(item.amount),
      }));

      setData(formatted);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-6">
        Category Expenses
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >

            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}