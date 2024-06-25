import React, { useMemo } from "react";
import useSearchTag from "./useSearchTag";
import { Tag, tags } from "@/src/shared/lib/types/tag";
import getActiveTags from "../lib/getActiveTags";

export default function useActiveTags(): [Tag[], (tag: string) => void] {
  const [searchTag, toggleSearchTag] = useSearchTag();

  const activeTags = useMemo(() => getActiveTags(tags, searchTag), [searchTag]);

  return [activeTags, toggleSearchTag];
}
