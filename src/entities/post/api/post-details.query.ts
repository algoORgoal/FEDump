import instance from "../../../shared/api/instance";
import { Post } from "../../../shared/types/post";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const getDetails = async (id: string) => {
  const response = await instance.get<Post>(`/posts/${id}`);
  return response.data;
};

export const POST_DETAILS_QUERY_KEY = ["postDetails"];

export const useGetDetailsQuery = (postId: string) =>
  useQuery({
    queryKey: [...POST_DETAILS_QUERY_KEY, postId],
    queryFn: () => getDetails(postId),
  });
