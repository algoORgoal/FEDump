import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title: "프론트엔드, 왜 하니?",
  publishedAt: "2023-08-28T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
