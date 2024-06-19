import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "📓A Glossary for Concurrency: Doing several things at the same time",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
