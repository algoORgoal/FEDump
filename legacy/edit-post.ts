import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../src/shared/api/instance";
import { Post } from "./post";
import { POST_DETAILS_QUERY_KEY } from "./post-details.query";

const editPost = async ({ id, post }: { id: string; post: Post }) => {
  const response = await instance.patch(`posts/${id}`, post);
  return response.data;
};

export const useEdit = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...POST_DETAILS_QUERY_KEY, id],
      });
    },
  });
};
