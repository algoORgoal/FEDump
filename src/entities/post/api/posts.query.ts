import { Post } from "@/src/shared/lib/types/post";
import { readdir } from "fs/promises";

const PostPages = {
  All: "all",
  Create: "create",
  Edit: "edit",
  Delete: "delete",
};

export const getPosts = async (): Promise<Post[]> => {
  const dirents = await readdir("./app/(posts)", { withFileTypes: true });
  const slugs = await dirents
    .filter((dirent) => dirent.isDirectory())
    .filter(
      (directoryDirent) =>
        !Object.values(PostPages).some(
          (PostPage) => PostPage === directoryDirent.name,
        ),
    );

  const posts = await Promise.all(
    slugs.map(async ({ name }): Promise<Post> => {
      const { metadata } = (await import(
        `/app/(posts)/${name}/layout.tsx`
      )) as {
        metadata: Omit<Post, "slug">;
      };
      return { slug: name, ...metadata };
    }),
  );

  posts.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return posts;
};
