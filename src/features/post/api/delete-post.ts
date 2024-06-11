import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../shared/api/instance";
import { POST_DETAILS_QUERY_KEY } from "../../../entities/post/api/post-details.query";
import { POST_LIST_QUERY_KEY } from "../../../entities/post/api/post-list.query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deletePost = async (id: string): Promise<any> => {
  const response = await instance.delete(`posts/${id}`);
  return response.data;
};

export const useDelete = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [...POST_DETAILS_QUERY_KEY, id] });
      queryClient.invalidateQueries({
        queryKey: POST_LIST_QUERY_KEY,
      });
    },
  });

  return mutation;
};
