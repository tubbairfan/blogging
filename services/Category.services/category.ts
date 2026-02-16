import { API } from "../../services/base"

export const createCategory = async (data: { title: string; description: string; status?: string }) => {
  const response = await API.post("/categories", data); 
  return response.data;
};

type RawCategory = {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  slug?: string;
  _count?: {
    articles?: number;
  };
};

export const getCategories = async () => {
  const { data } = await API.get("/categories");
  const categories: RawCategory[] = Array.isArray(data)
    ? (data as RawCategory[])
    : ((data?.data ?? []) as RawCategory[]);

  return categories.map((cat) => ({
    id: cat.id,
    title: cat.title ?? "",
    description: cat.description ?? "",
    status: cat.status ?? "DRAFT",
    slug: cat.slug ?? "",
    articles: cat._count?.articles || 0,
  }));
};

export const deleteCategory = async (id: number) => {
  const { data } = await API.delete(`/categories/${id}`);
  return data;
};

export const updateCategory = async (id: number, body: { title?: string; description?: string; status?: string }) => {
  const { data } = await API.put(`/categories/${id}`, body);
  return data;
};


export const getCategoryById = async (id: number) => {
  const { data } = await API.get(`/categories/${id}`);
  return data.data; 
};
