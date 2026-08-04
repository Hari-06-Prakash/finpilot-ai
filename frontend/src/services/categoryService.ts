import api from "../api/api";

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  created_at: string;
}

// Get all categories
export async function getCategories() {
  const response = await api.get<Category[]>("/categories");
  return response.data;
}

// Create category
export async function createCategory(data: {
  name: string;
  icon: string;
  color: string;
}) {
  const response = await api.post<Category>("/categories", data);
  return response.data;
}

// Update category
export async function updateCategory(
  id: number,
  data: {
    name: string;
    icon: string;
    color: string;
  }
) {
  const response = await api.put<Category>(
    `/categories/${id}`,
    data
  );

  return response.data;
}

// Delete category
export async function deleteCategory(id: number) {
  const response = await api.delete(
    `/categories/${id}`
  );

  return response.data;
}