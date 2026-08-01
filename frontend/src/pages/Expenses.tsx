import { useEffect, useState } from "react";

import api from "../api/api";

import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";
import DeleteExpenseModal from "../components/expenses/DeleteExpenseModal";

export default function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmitExpense(data: any) {
    try {
      if (selectedExpense) {
        await api.put(`/expenses/${selectedExpense.id}`, data);
      } else {
        await api.post("/expenses", data);
      }

      setOpenModal(false);
      setSelectedExpense(null);

      loadExpenses();

    } catch (error) {
      console.error(error);
      alert("Failed to save expense");
    }
  }

  async function handleDeleteExpense() {
    try {
      await api.delete(`/expenses/${selectedExpense.id}`);

      setOpenDeleteModal(false);
      setSelectedExpense(null);

      loadExpenses();

    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Expenses
        </h1>

        <button
          onClick={() => {
            setSelectedExpense(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Expense
        </button>

      </div>

      <ExpenseTable
        expenses={expenses}
        onEdit={(expense) => {
          setSelectedExpense(expense);
          setOpenModal(true);
        }}
        onDelete={(expense) => {
          setSelectedExpense(expense);
          setOpenDeleteModal(true);
        }}
      />

      <ExpenseModal
        open={openModal}
        expense={selectedExpense}
        onClose={() => {
          setOpenModal(false);
          setSelectedExpense(null);
        }}
        onSubmit={handleSubmitExpense}
      />

      <DeleteExpenseModal
        open={openDeleteModal}
        expense={selectedExpense}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedExpense(null);
        }}
        onDelete={handleDeleteExpense}
      />

    </div>
  );
}