import React, { ReactNode } from "react";
import "highlight.js/styles/a11y-light.css";
import { Header } from "@/src/widget/post/ui/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="box-border w-full px-4 md:mx-auto md:w-[768px]">
      <Header />
      {children}
    </div>
  );
}
