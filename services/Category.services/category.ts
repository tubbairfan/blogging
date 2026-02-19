import { API } from "../../services/base";

export type CategoryPayload = {
  title: string;
  description: string;
  status?: string;
  image?: File;
};

type RawCategory = {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  slug?: string;
  image?: string;
  _count?: {
    articles?: number;
  };
};

const toFormData = (payload: Partial<CategoryPayload>) => {
  const formData = new FormData();

  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.description !== undefined) formData.append("description", payload.description);
  if (payload.status !== undefined) formData.append("status", payload.status);
  if (payload.image) formData.append("image", payload.image);

  return formData;
};

export const createCategory = async (data: CategoryPayload) => {
  const response = await API.post("/categories", toFormData(data), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
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
    image: cat.image || "/Cell.svg",
    articles: cat._count?.articles || 0,
  }));
};

export const deleteCategory = async (id: number, force = false) => {
  const { data } = await API.delete(`/categories/${id}`, {
    params: force ? { force: "true" } : undefined,
  });
  return data;
};

export const updateCategory = async (id: number, body: Partial<CategoryPayload>) => {
  const { data } = await API.put(`/categories/${id}`, toFormData(body), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getCategoryById = async (id: number) => {
  const { data } = await API.get(`/categories/${id}`);
  return data.data;
};
