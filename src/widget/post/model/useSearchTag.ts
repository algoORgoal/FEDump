import useSearchParam from "@/src/shared/model/useSearchParam";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchTag(): [string | null, (tag: string) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTag, setSearchTag] = useSearchParam("tag");

  const toggleLangTag = (lang: string): void => {
    if (lang) {
      setSearchTag(lang);
      return;
    }

    const removedSearchParams = new URLSearchParams(searchParams);
    removedSearchParams.delete("tag");
    removedSearchParams.delete("lang");
    router.push(`${pathname}?${removedSearchParams}`);
  };

  return [searchTag, toggleLangTag];
}
