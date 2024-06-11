import { useSearchStore } from "..";
import { useDebounce } from "../../../shared/model/useDebounce";

export const useDebouncedQuery = () => {
  const query = useSearchStore((state) => state.query);
  const debouncedQuery = useDebounce(query, 500);

  return debouncedQuery;
};
