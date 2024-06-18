import { PostCard } from "@/src/entities/post";
import { getPosts } from "@/src/entities/post/api/post-list.query";

import React from "react";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <ol>
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ol>
  );
}
