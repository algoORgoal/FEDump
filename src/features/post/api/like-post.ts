// 미션: 좋아요 버튼 클릭 시 +1 PATCH mutation hook 구현하기

import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../shared/api/instance";
import { POST_DETAILS_QUERY_KEY } from "../../../entities/post/api/post-details.query";
import { POST_LIST_QUERY_KEY } from "../../../entities/post/api/post-list.query";

const likePost = async ({ likes, id }: { likes: number; id: string }) => {
  const response = await instance.patch(`posts/${id}`, {
    likes: likes + 1,
  });

  return response.data;
};

export const useLike = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...POST_DETAILS_QUERY_KEY, id],
      });
      queryClient.invalidateQueries({
        queryKey: POST_LIST_QUERY_KEY,
      });
    },
  });
};
