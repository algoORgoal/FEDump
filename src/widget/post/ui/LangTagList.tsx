"use client";

import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/src/shared/ui/toggle-group";

import Tag from "@/src/features/filter-post/ui/tag";
import useActiveLangTags from "../model/useAcitveLangs";

import useSearchLangTag from "../model/useSearchLangTag";

export default function LangTagList() {
  // const [langTag, setLangTag] = useState("");
  const [activeLangs, toggleLang] = useActiveLangTags();
  const [searchLangTag] = useSearchLangTag();

  const handleLangTagState = (langTag: string): void => {
    // setLangTag(langTag);
    toggleLang(langTag);
  };
  console.log(activeLangs);

  return (
    <ToggleGroup
      type="single"
      onValueChange={handleLangTagState}
      value={searchLangTag || ""}
    >
      {activeLangs.map((lang) => (
        <Tag key={`${lang}`} tag={lang} />
      ))}
    </ToggleGroup>
  );
}
