import api from "../api/api";

export async function getMonthlyComparison() {
  const response = await api.get("/analytics/monthly-comparison");
  return response.data;
}

export async function getFinancialInsights() {
  const response = await api.get("/analytics/financial-insights");
  return response.data;
}

export async function getPaymentMethodAnalysis() {
  const response = await api.get("/analytics/payment-method-analysis");
  return response.data;
}

export async function getWeeklySpending() {
  const response = await api.get("/analytics/weekly-spending");
  return response.data;
}