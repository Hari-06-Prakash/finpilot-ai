import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/api";

import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";
import DeleteExpenseModal from "../components/expenses/DeleteExpenseModal";
import ExpenseFilters from "../components/expenses/ExpenseFilters";

import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

export default function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, dateFilter, itemsPerPage]);

  async function loadExpenses() {
    try {
      setLoading(true);

      const response = await api.get("/expenses");

      setExpenses(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitExpense(data: any) {
    try {
      if (selectedExpense) {
        await api.put(`/expenses/${selectedExpense.id}`, data);

        toast.success("Expense updated successfully");
      } else {
        await api.post("/expenses", data);

        toast.success("Expense added successfully");
      }

      setOpenModal(false);
      setSelectedExpense(null);

      loadExpenses();
    } catch (error) {
      console.error(error);

      toast.error("Failed to save expense");
    }
  }

  async function handleDeleteExpense() {
    try {
      await api.delete(`/expenses/${selectedExpense.id}`);

      toast.success("Expense deleted successfully");

      setOpenDeleteModal(false);
      setSelectedExpense(null);

      loadExpenses();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete expense");
    }
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense: any) => {
      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        expense.merchant
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "" ||
        expense.category_id.toString() === category;

      const expenseDate = new Date(expense.expense_date);
      const today = new Date();

      let matchesDate = true;

      switch (dateFilter) {
        case "today":
          matchesDate =
            expenseDate.toDateString() === today.toDateString();
          break;

        case "week": {
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);

          matchesDate = expenseDate >= weekAgo;
          break;
        }

        case "month":
          matchesDate =
            expenseDate.getMonth() === today.getMonth() &&
            expenseDate.getFullYear() === today.getFullYear();
          break;

        default:
          matchesDate = true;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate
      );
    });
  }, [expenses, search, category, dateFilter]);

  const totalPages = Math.ceil(
        filteredExpenses.length / itemsPerPage
    );

  const paginatedExpenses = filteredExpenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
  );

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

        <ExpenseFilters
            search={search}
            category={category}
            dateFilter={dateFilter}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onDateFilterChange={setDateFilter}
        />

        {loading ? (
            <LoadingSpinner />
        ) : filteredExpenses.length === 0 ? (
            <EmptyState
            title="No expenses found"
            description="Try changing your search or filters, or add a new expense."
            />
        ) : (
            <>
            <ExpenseTable
                expenses={paginatedExpenses}
                onEdit={(expense) => {
                setSelectedExpense(expense);
                setOpenModal(true);
                }}
                onDelete={(expense) => {
                setSelectedExpense(expense);
                setOpenDeleteModal(true);
                }}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredExpenses.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(value) => {
                    setItemsPerPage(value);
                    setCurrentPage(1);
                }}
            />
            </>
        )}

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