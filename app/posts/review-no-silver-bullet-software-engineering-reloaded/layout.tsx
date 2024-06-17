import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title: "🤔 Review: No Silver Bullet-Software Engineering Reloaded",
  publishedAt: "2023-09-07T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
