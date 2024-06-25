import useSearchParam from "@/src/shared/model/useSearchParam";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchLangTag(): [
  string | null,
  (tag: string) => void,
] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [searchTag, setSearchTag] = useSearchParam("lang");

  const toggleTag = (tag: string): void => {
    if (tag) {
      setSearchTag(tag);
      return;
    }

    const removedSearchParams = new URLSearchParams(searchParams);
    removedSearchParams.delete("lang");
    router.push(`${pathname}?${removedSearchParams}`);
  };

  return [searchTag, toggleTag];
}
