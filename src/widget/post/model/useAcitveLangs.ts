import { useMemo } from "react";

import getActiveLangs from "../lib/getActiveLangTags";
import { Lang, langs } from "@/src/shared/lib/types/lang";
import useSearchLangTag from "./useSearchLangTag";
import useSearchTag from "./useSearchTag";

export default function useActiveLangTags(): [Lang[], (lang: string) => void] {
  const [searchLang, toggleSearchLang] = useSearchLangTag();
  const [searchTag] = useSearchTag();

  const activeLangs = useMemo(
    (): Lang[] => getActiveLangs(langs, searchLang, searchTag),
    [searchLang, searchTag],
  );

  return [activeLangs, toggleSearchLang];
}
