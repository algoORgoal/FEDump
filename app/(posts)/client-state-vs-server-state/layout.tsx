import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & { publishedAt: string } = {
  title: "Client state vs. Server state",
  publishedAt: "2024-05-31T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
