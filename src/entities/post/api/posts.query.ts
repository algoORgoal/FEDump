import { readdir } from "fs/promises";

interface Post {
  slug: string;
  title: string;
  publishedAt: string;
}

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
          (PostPage) => PostPage === directoryDirent.name
        )
    );

  const posts = await Promise.all(
    slugs.map(async ({ name }): Promise<Post> => {
      const { metadata } = (await import(
        `/app/(posts)/${name}/layout.tsx`
      )) as {
        metadata: { title: string; publishedAt: string };
      };
      return { slug: name, ...metadata };
    })
  );

  posts.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return posts;
};
