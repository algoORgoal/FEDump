import { Metadata } from "next";
import React, { ReactNode } from "react";
  
export const metadata: Metadata & { publishedAt: string } = {
  title: "Stop rerendering with useCallback()",
  publishedAt: "2024-05-04T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}