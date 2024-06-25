import { ToggleGroupItem } from "@/src/shared/ui/toggle-group";
import React from "react";

interface TapPropsType {
  tag: string;
}

export default function Tag({ tag }: TapPropsType) {
  return (
    <ToggleGroupItem
      value={`${tag}`}
      aria-label={`Toggle ${tag}`}
      className="flex-initial whitespace-nowrap"
    >
      {tag}
    </ToggleGroupItem>
  );
}
