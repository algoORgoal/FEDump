import { getPosts } from "@/src/entities/post/api/post-list.query";
import { PostCard } from "@/src/entities/post/ui/PostCard";
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
