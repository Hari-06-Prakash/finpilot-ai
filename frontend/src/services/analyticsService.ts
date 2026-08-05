import api from "../api/api";

export async function getMonthlyComparison() {
  const response = await api.get("/analytics/monthly-comparison");
  return response.data;
}