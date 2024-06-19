import { Post } from "../../../shared/types/post";

export const getMatchingList = (postList: Post[], query: string) => {
  if (!query) {
    return postList;
  }
  return postList.filter(
    (post) => post.title.includes(query) || post.body.includes(query)
  );
};
