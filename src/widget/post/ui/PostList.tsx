import { PostCard } from "@/src/entities/post";
import { getPosts } from "@/src/entities/post/api/post-list.query";

import React from "react";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <span key={post.slug}>
          <PostCard post={post} />
        </span>
      ))}
    </>
  );
}
