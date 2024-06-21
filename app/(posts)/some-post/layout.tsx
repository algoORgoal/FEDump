import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & { publishedAt: string } = {
  title: "Some example post",
  publishedAt: new Date(Date.now()).toISOString(),
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
