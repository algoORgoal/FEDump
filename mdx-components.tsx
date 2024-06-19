import type { MDXComponents } from "mdx/types";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "./src/shared/ui/heading";
import Paragraph from "./src/shared/ui/paragraph";
import Image, { ImageProps } from "next/image";
import Unordered from "./src/shared/ui/unordered";
import Ordered from "./src/shared/ui/ordered";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    ol: Ordered,
    ul: Unordered,
    img: (props) => (
      <div className="relative h-96 w-full">
        <Image
          fill
          {...(props as ImageProps)}
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    p: Paragraph,
    ...components,
  };
}
