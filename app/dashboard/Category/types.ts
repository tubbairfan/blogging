export type Category = {
  id: number;
  image: string;
  title: string;
  description: string;
  status: string;
  slug: string;
  articles: number;
};

export type CategoryDetail = {
  id: number;
  title: string;
  description: string;
  status: string;
  slug: string;
  _count?: {
    articles?: number;
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
