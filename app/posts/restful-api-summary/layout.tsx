import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title: "RESTful API Summary",
  publishedAt: "2023-09-03T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
