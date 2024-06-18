import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title: "Edge Database Benchmarks",
  publishedAt: "2024-06-07T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
