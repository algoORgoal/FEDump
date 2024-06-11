import instance from "../../../shared/api/instance";
import { Post } from "../../../shared/types/post";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const getList = async (
  params: undefined | { title: string } | { page: number; perPage: number }
) => {
  const response = await instance.get<Post[]>("/posts", { params });
  return response.data;
};
export const POST_LIST_QUERY_KEY = ["postList"];

export const useGetListQuery = (
  params: undefined | { title: string } = undefined
) =>
  useQuery({
    queryKey: [...POST_LIST_QUERY_KEY, params],
    queryFn: () => getList(params),
    gcTime: 0,
  });

export const getPage = async ({ pageParam }: { pageParam: number }) => {
  const response = await instance.get<{
    previous: number | null;
    next: number | null;
    data: Post[];
  }>("/posts", {
    params: { _page: pageParam, _per_page: 2 },
  });

  return response.data;
};

export const POST_PAGE_QUERY_KEY = ["postPage"];

export const useGetPage = () =>
  useInfiniteQuery({
    queryKey: [...POST_LIST_QUERY_KEY],
    queryFn: getPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
  });

// export const useGetPageQuery = ({
//   page,
//   perPage,
// }: {
//   page: number;
//   perPage: number;
// }) => {
//   return useInfiniteQuery({
//     queryKey: [...POST_LIST_QUERY_KEY, undefined],
//     queryFn: () => getList({page, perPage}),
//     initialPageParam: {
//       page: 1,
//       perPage: 5,
//     },
//     getNextPageParam: (lastPage, allPages) => lastPage.length ? allPages.length + 1: undefined;
//   })
// };
