"use client";

import React from "react";
import { ToggleGroup } from "@/src/shared/ui/toggle-group";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import useActiveTags from "../model/useActiveTags";
import Tag from "@/src/features/filter-post/ui/tag";
import LangTagList from "./LangTagList";
import useSearchTag from "../model/useSearchTag";

export default function TagList() {
  const [activeTags, toggleTag] = useActiveTags();
  const [searchTag] = useSearchTag();

  const [parent] = useAutoAnimate();

  const handleTagState = (tag: string): void => {
    toggleTag(tag);
  };

  return (
    <ToggleGroup
      type="single"
      onValueChange={handleTagState}
      value={searchTag || ""}
    >
      <span
        ref={parent}
        className="flex w-full flex-row items-center justify-start overflow-y-scroll scrollbar-hide"
      >
        {activeTags.map((tag) => (
          <Tag key={`${tag}`} tag={tag} />
        ))}
        <LangTagList />
      </span>
    </ToggleGroup>
  );
}
