import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata & { publishedAt: string } = {
  title: "Data handling in Next.js🍕",
  publishedAt: "2024-05-25T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
