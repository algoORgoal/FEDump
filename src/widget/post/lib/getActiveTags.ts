import { Tag } from "@/src/shared/lib/types/tag";

const getActiveTags = (tags: Readonly<Tag[]>, searchTag: string | null) =>
  tags.filter((tag) => !searchTag || tag === searchTag);

export default getActiveTags;
