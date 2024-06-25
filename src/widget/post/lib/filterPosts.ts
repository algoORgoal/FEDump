import { Post } from "@/src/shared/lib/types/post";
import { Tag } from "@/src/shared/lib/types/tag";

export const filterPostsByTag = (posts: Post[], filterTag: Tag) => {
  return posts.filter(
    (post) => post.tags && post.tags.some((tag) => tag === filterTag),
  );
};
