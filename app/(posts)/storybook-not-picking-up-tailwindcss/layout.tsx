import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & { publishedAt: string } = {
  title: "📚Storybook not picking up tailwindcss",
  publishedAt: "2024-04-16T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
