import { useSearchStore } from "../src/features/search";
import { useDebounce } from "../src/shared/model/useDebounce";

export const useDebouncedQuery = () => {
  const query = useSearchStore((state) => state.query);
  const debouncedQuery = useDebounce(query, 500);

  return debouncedQuery;
};
