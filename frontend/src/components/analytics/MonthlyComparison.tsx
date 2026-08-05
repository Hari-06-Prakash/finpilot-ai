import { useEffect, useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  Minus,
  CalendarDays,
} from "lucide-react";

import { getMonthlyComparison } from "../../services/analyticsService";

export default function MonthlyComparison() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadComparison();
  }, []);

  async function loadComparison() {
    try {
      const response = await getMonthlyComparison();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex items-center justify-center">
        <p className="text-slate-500">Loading comparison...</p>
      </div>
    );
  }

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const previousDate = new Date();
  previousDate.setMonth(previousDate.getMonth() - 1);

  const previousMonthName = previousDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const currentAmount = Number(data.current_month);
  const previousAmount = Number(data.previous_month);
  const difference = Number(data.difference);

  const isIncrease = data.status === "increase";
  const isDecrease = data.status === "decrease";
  const isSame = data.status === "same";

  const firstMonth = previousAmount === 0;

  const currency = (value: number) =>
    value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

      <div className="flex items-center gap-2 mb-2">
        <CalendarDays className="text-blue-600" size={22} />

        <h2 className="text-xl font-bold text-slate-800">
          Monthly Comparison
        </h2>
      </div>

      <p className="text-sm text-slate-500 mb-8">
        Compare your spending with the previous month.
      </p>

      <div className="grid grid-cols-2 gap-8">

        <div>

          <p className="text-sm text-slate-500">
            {currentMonthName}
          </p>

          <h3 className="text-4xl font-bold text-slate-900 mt-2">
            ₹{currency(currentAmount)}
          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            {previousMonthName}
          </p>

          <h3 className="text-4xl font-bold text-slate-900 mt-2">
            ₹{currency(previousAmount)}
          </h3>

        </div>

      </div>

      <div
        className={`mt-8 rounded-xl p-5 flex items-start gap-4

        ${
          isIncrease
            ? "bg-gradient-to-r from-red-50 to-red-100 text-red-700"
            : isDecrease
            ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700"
            : "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700"
        }`}
      >

        {isIncrease && <ArrowUp size={28} />}

        {isDecrease && <ArrowDown size={28} />}

        {isSame && <Minus size={28} />}

        <div>

          {firstMonth ? (
            <>
              <h3 className="font-bold text-lg">
                🎉 First Month Recorded
              </h3>

              <p className="text-sm mt-1">
                No previous month's data is available.
              </p>

              <p className="mt-2 font-semibold">
                Current Spending: ₹{currency(currentAmount)}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg">

                {isIncrease && "Spending Increased"}

                {isDecrease && "Spending Decreased"}

                {isSame && "No Change"}

              </h3>

              <p className="text-sm mt-1">

                {Math.abs(data.percentage_change)}%

                {" "}

                {isIncrease
                  ? "higher than last month."
                  : isDecrease
                  ? "lower than last month."
                  : "compared with last month."}

              </p>

              <p className="mt-2 font-semibold">

                Difference :

                {" "}

                {isIncrease ? "+" : isDecrease ? "-" : ""}

                ₹{currency(difference)}

              </p>
            </>
          )}

        </div>

      </div>

    </div>
  );
}