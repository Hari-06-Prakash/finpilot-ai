import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

import CategoryTable from "../components/categories/CategoryTable";
import CategoryModal from "../components/categories/CategoryModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";
import CategoryFilters from "../components/categories/CategoryFilters";

import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  async function loadCategories() {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: any) {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, data);
        toast.success("Category updated successfully");
      } else {
        await createCategory(data);
        toast.success("Category created successfully");
      }

      setOpenModal(false);
      setSelectedCategory(null);

      loadCategories();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
          "Operation failed"
      );
    }
  }

  async function handleDelete() {
    try {
      await deleteCategory(selectedCategory.id);

      toast.success("Category deleted");

      setOpenDeleteModal(false);
      setSelectedCategory(null);

      loadCategories();
    } catch (error) {
      toast.error("Delete failed");
    }
  }

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  const totalPages = Math.ceil(
    filteredCategories.length / itemsPerPage
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Categories
          </h1>

          <p className="text-slate-500 mt-2">
            Manage and organize your expense categories.
          </p>

          <div className="mt-4 inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-semibold">
            📂 {categories.length} Categories
          </div>

        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setOpenModal(true);
          }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg"
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>

      {/* Search */}

      <CategoryFilters
        search={search}
        onSearchChange={setSearch}
      />

      {/* Content */}

      {loading ? (
        <LoadingSpinner />
      ) : filteredCategories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Create your first category."
        />
      ) : (
        <>
          <CategoryTable
            categories={paginatedCategories}
            onEdit={(category) => {
              setSelectedCategory(category);
              setOpenModal(true);
            }}
            onDelete={(category) => {
              setSelectedCategory(category);
              setOpenDeleteModal(true);
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredCategories.length}
            itemsPerPage={itemsPerPage}
            label="categories"
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </>
      )}

      <CategoryModal
        open={openModal}
        category={selectedCategory}
        onClose={() => {
          setOpenModal(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteCategoryModal
        open={openDeleteModal}
        category={selectedCategory}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedCategory(null);
        }}
        onDelete={handleDelete}
      />

    </div>
  );
}