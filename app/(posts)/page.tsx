import PostList from "@/src/widget/post/ui/PostList";
import TagList from "@/src/widget/post/ui/TagList";
import React from "react";

export default function Page() {
  return (
    <>
      <TagList />
      <PostList />
    </>
  );
}
