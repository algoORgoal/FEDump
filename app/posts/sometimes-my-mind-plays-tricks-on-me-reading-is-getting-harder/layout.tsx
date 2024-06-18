import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title: "📖Sometimes my mind plays tricks on me - Reading is getting harder",
  publishedAt: "2024-04-13T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
