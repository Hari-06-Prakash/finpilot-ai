import api from "../api/api";
import type { CreateIncome } from "../types/income";

const incomeService = {
  async getIncome() {
    const response = await api.get("/income");
    return response.data;
  },

  async createIncome(data: CreateIncome) {
    const response = await api.post("/income", data);
    return response.data;
  },

  async updateIncome(id: number, data: CreateIncome) {
    const response = await api.put(`/income/${id}`, data);
    return response.data;
  },

  async deleteIncome(id: number) {
    const response = await api.delete(`/income/${id}`);
    return response.data;
  },
};

export default incomeService;