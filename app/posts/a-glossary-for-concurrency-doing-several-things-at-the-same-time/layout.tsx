import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title: "📓A Glossary for Concurrency: Doing several things at the same time",
  publishedAt: "2023-09-04T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
