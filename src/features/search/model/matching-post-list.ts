import { useGetPostListQuery } from "../../../entities/post";
import { useDebouncedQuery } from "./debounced-query";

export const useMatchingList = () => {
  const debouncedQuery = useDebouncedQuery();

  const {
    data: matchingPostList,
    isLoading,
    error,
  } = useGetPostListQuery({ title: debouncedQuery });

  return { data: matchingPostList || [], isLoading, error };
};
