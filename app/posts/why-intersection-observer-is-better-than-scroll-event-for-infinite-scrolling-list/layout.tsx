import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title:
    "Why Intersection Observer is Better than Scroll Event for Infinite Scrolling List",
  publishedAt: "2024-06-03T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
