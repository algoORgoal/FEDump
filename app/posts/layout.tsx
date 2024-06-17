import React, { ReactNode } from "react";
import "highlight.js/styles/default.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full md:w-[768px] mx-auto">{children}</div>;
}
