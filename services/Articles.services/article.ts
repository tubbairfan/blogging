import { API } from "../base";

export type ArticlePayload = {
  name: string;
  description: string;
  categoryName: string;
  status?: string;
};

type RawArticle = {
  id: number;
  name?: string;
  description?: string;
  status?: string;
  category?: {
    title?: string;
  };
};

export const createArticle = async (data: ArticlePayload) => {
  const response = await API.post("/articles", data);
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
    image: "/Aspect Ratio.svg",
    title: article.name ?? "",
    description: stripHtml(article.description ?? ""),
    status: (article.status || "DRAFT").toUpperCase() === "ACTIVE" ? "Active" : "Draft",
    category: article.category?.title ?? "",
  }));
};

export const getArticleById = async (id: number) => {
  const { data } = await API.get(`/articles/${id}`);
  return data?.data;
};

export const updateArticle = async (id: number, body: Partial<ArticlePayload>) => {
  const { data } = await API.put(`/articles/${id}`, body);
  return data;
};

export const deleteArticle = async (id: number) => {
  const { data } = await API.delete(`/articles/${id}`);
  return data;
};
