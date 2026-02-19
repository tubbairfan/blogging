export type ArticleStatus = "ACTIVE" | "DRAFT";

export type Article = {
  id: number;
  image: string;
  title: string;
  description: string;
  status: ArticleStatus;
  category: string;
};
