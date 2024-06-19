import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & { publishedAt: string } = {
  title: "2019-2024 회고",
  publishedAt: "2024-05-09T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
