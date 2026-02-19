import { API } from "../base";

export type ArticlePayload = {
  name: string;
  description: string;
  categoryName: string;
  status?: "ACTIVE" | "DRAFT";
  image?: File;
};

type RawArticle = {
  id: number;
  name?: string;
  description?: string;
  image?: string;
  status?: string;
  category?: {
    title?: string;
  };
};

const toFormData = (payload: Partial<ArticlePayload>) => {
  const formData = new FormData();

  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.description !== undefined) formData.append("description", payload.description);
  if (payload.categoryName !== undefined) formData.append("categoryName", payload.categoryName);
  if (payload.status !== undefined) formData.append("status", payload.status);
  if (payload.image) formData.append("image", payload.image);

  return formData;
};

export const createArticle = async (data: ArticlePayload) => {
  const response = await API.post("/articles", toFormData(data), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getArticles = async () => {
  const { data } = await API.get("/articles");
  const articles: RawArticle[] = Array.isArray(data)
    ? (data as RawArticle[])
    : ((data?.data ?? []) as RawArticle[]);

  const stripHtml = (value: string) =>
    value
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  return articles.map((article) => ({
    id: article.id,
    image: article.image || "/Cell.svg",
    title: article.name ?? "",
    description: stripHtml(article.description ?? ""),
    status: (article.status || "DRAFT").toUpperCase() === "ACTIVE" ? "ACTIVE" : "DRAFT",
    category: article.category?.title ?? "",
  }));
};

export const getArticleById = async (id: number) => {
  const { data } = await API.get(`/articles/${id}`);
  return data?.data;
};

export const updateArticle = async (id: number, body: Partial<ArticlePayload>) => {
  const { data } = await API.put(`/articles/${id}`, toFormData(body), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteArticle = async (id: number) => {
  const { data } = await API.delete(`/articles/${id}`);
  return data;
};
