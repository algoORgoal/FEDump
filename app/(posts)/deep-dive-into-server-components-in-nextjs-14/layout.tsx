import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & { publishedAt: string } = {
  title: "🕵️Deep Dive into Server Components in Next.js 14",
  publishedAt: "2024-04-18T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
