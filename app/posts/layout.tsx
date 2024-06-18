import React, { ReactNode } from "react";
import "highlight.js/styles/a11y-light.css";
import { Header } from "@/src/widget/post/ui/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full md:w-[768px] mx-auto">
      <Header />
      <article>{children}</article>
    </div>
  );
}
