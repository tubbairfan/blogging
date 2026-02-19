export type CategoryStatus = "ACTIVE" | "DRAFT";

export type Category = {
  id: number;
  image: string;
  title: string;
  description: string;
  status: CategoryStatus;
  slug: string;
  articles: number;
};
