import api from "../api/api";

/**
 * Budget API Service
 */

export const budgetService = {
  /**
   * Create or Update Monthly Budget
   */
  async createBudget(budgetAmount: number) {
    const response = await api.post("/budget", {
      budget_amount: budgetAmount,
    });

    return response.data;
  },

  /**
   * Get Current Budget
   */
  async getCurrentBudget() {
    const response = await api.get("/budget/current");

    return response.data;
  },

  /**
   * Get Budget History
   */
  async getBudgetHistory() {
    const response = await api.get("/budget/history");

    return response.data;
  },

  /**
   * Get Budget Overview
   */
  async getBudgetOverview() {
    const response = await api.get("/budget/overview");

    return response.data;
  },
};