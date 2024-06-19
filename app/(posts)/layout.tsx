import React, { ReactNode } from "react";
import "highlight.js/styles/a11y-light.css";
import { Header } from "@/src/widget/post/ui/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full md:w-[768px]">
      <Header />
      {children}
    </div>
  );
}
