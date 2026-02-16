export type Article = {
  id: number;
  image: string;
  title: string;
  description: string;
  status: string;
  category: string;
};

export type ArticleDetail = {
  id: number;
  name: string;
  description: string;
  status: string;
  category?: {
    title?: string;
  };
};

export const toUiStatus = (status?: string) => {
  const value = (status || "").toLowerCase();
  if (value === "active") return "Active";
  if (value === "draft") return "Draft";
  return status || "Draft";
};

export const toApiStatus = (status?: string) => {
  const value = (status || "").toLowerCase();
  if (value === "active") return "ACTIVE";
  if (value === "draft") return "DRAFT";
  return "DRAFT";
};
