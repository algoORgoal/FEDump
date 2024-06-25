import { Tag } from "./tag";

export interface Post {
  slug: string;
  title: string;
  publishedAt: string;
  tags?: Tag[];
  langauge?: "en" | "kr";
}
