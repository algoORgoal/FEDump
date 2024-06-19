import { readdir } from "fs/promises";
import instance from "../src/shared/api/instance";
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

// export const getFilePosts = async ({pageParam} : {pageParam : number}): Promise<Post[] | null> => {
//  const PER_PAGE = 2;
//  const allPosts = await getPosts();

//   // Get a subset of posts pased on page and limit
//   const paginatedPosts = allPosts.slice((pageParam - 1) * PER_PAGE, pageParam * PER_PAGE - 1);

//   return {
//     prev: pageParam - 1,
//     page: ,
//     next: pageParam + 1,
//     data: paginatedPosts,
//   }
// };

// export const useGetFilePage = () =>
//   useInfiniteQuery({
//     queryKey: [...POST_LIST_QUERY_KEY],
//     queryFn: getFilePosts,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => lastPage.next,
//   });
