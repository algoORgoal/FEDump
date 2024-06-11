import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../../shared/types/post";
import instance from "../../../shared/api/instance";
import { POST_LIST_QUERY_KEY } from "../../../entities/post/api/post-list.query";

const submitPost = async (newPost: Post) => instance.post("/posts", newPost);

// 글 작성 POST hook
export const useSubmit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POST_LIST_QUERY_KEY });
    },
  });
};
