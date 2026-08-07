import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/api";

import IncomeTable from "../components/income/IncomeTable";
import IncomeModal from "../components/income/IncomeModal";
import DeleteIncomeModal from "../components/income/DeleteIncomeModal";
import IncomeFilters from "../components/income/IncomeFilters";

import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

import useCategories from "../hooks/useCategories";

export default function Income() {
  const [incomes, setIncomes] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedIncome, setSelectedIncome] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [dateFilter, setDateFilter] = useState("all");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { categories } = useCategories();

  useEffect(() => {
    loadIncome();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    paymentMethod,
    dateFilter,
    startDate,
    endDate,
    itemsPerPage,
  ]);

  async function loadIncome() {
    try {
      setLoading(true);

      const response = await api.get("/income");

      setIncomes(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load income");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitIncome(data: any) {
    try {
      if (selectedIncome) {
        await api.put(`/income/${selectedIncome.id}`, data);

        toast.success("Income updated successfully");
      } else {
        await api.post("/income", data);

        toast.success("Income added successfully");
      }

      setOpenModal(false);
      setSelectedIncome(null);

      loadIncome();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save income");
    }
  }

  async function handleDeleteIncome() {
    try {
      await api.delete(`/income/${selectedIncome.id}`);

      toast.success("Income deleted successfully");

      setOpenDeleteModal(false);
      setSelectedIncome(null);

      loadIncome();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete income");
    }
  }

  const filteredIncome = useMemo(() => {
    return incomes.filter((income: any) => {
      const matchesSearch =
        income.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        income.source
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "" ||
        income.category_id?.toString() === category;

      const matchesPayment =
        paymentMethod === "" ||
        income.payment_method === paymentMethod;

      const incomeDate = new Date(income.income_date);
      const today = new Date();

      let matchesDate = true;

      switch (dateFilter) {
        case "today":
          matchesDate =
            incomeDate.toDateString() ===
            today.toDateString();
          break;

        case "week":
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);

          matchesDate = incomeDate >= weekAgo;
          break;

        case "month":
          matchesDate =
            incomeDate.getMonth() === today.getMonth() &&
            incomeDate.getFullYear() ===
              today.getFullYear();
          break;

        case "custom":
          if (startDate && endDate) {
            matchesDate =
              incomeDate >= new Date(startDate) &&
              incomeDate <= new Date(endDate);
          }
          break;

        default:
          matchesDate = true;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPayment &&
        matchesDate
      );
    });
  }, [
    incomes,
    search,
    category,
    paymentMethod,
    dateFilter,
    startDate,
    endDate,
  ]);

  const totalPages = Math.ceil(
    filteredIncome.length / itemsPerPage
  );

  const paginatedIncome = filteredIncome.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Income
        </h1>

        <button
          onClick={() => {
            setSelectedIncome(null);
            setOpenModal(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Income
        </button>

      </div>

      <IncomeFilters
        search={search}
        paymentMethod={paymentMethod}
        category={category}
        dateFilter={dateFilter}
        startDate={startDate}
        endDate={endDate}
        categories={categories}
        onSearchChange={setSearch}
        onPaymentMethodChange={setPaymentMethod}
        onCategoryChange={setCategory}
        onDateFilterChange={setDateFilter}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {loading ? (
        <LoadingSpinner />
      ) : filteredIncome.length === 0 ? (
        <EmptyState
          title="No Income Found"
          description="Add your first income."
        />
      ) : (
        <>
          <IncomeTable
            incomes={paginatedIncome}
            onEdit={(income) => {
              setSelectedIncome(income);
              setOpenModal(true);
            }}
            onDelete={(income) => {
              setSelectedIncome(income);
              setOpenDeleteModal(true);
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredIncome.length}
            itemsPerPage={itemsPerPage}
            label="income records"
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      )}

      <IncomeModal
        open={openModal}
        income={selectedIncome}
        onClose={() => {
          setOpenModal(false);
          setSelectedIncome(null);
        }}
        onSubmit={handleSubmitIncome}
      />

      <DeleteIncomeModal
        open={openDeleteModal}
        income={selectedIncome}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedIncome(null);
        }}
        onDelete={handleDeleteIncome}
      />

    </div>
  );
}