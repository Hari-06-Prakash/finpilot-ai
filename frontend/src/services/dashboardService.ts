import api from "../api/api";

export async function getDashboardSummary() {
  const response = await api.get("/dashboard/summary");
  return response.data;
}

export async function getCategorySummary() {
  const response = await api.get("/dashboard/category-summary");
  return response.data;
}

export async function getMonthlyTrend() {
  const response = await api.get("/dashboard/monthly-trend");
  return response.data;
}

export async function getRecentExpenses() {
  const response = await api.get("/dashboard/recent-expenses");
  return response.data;
}