import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full md:w-[768px] mx-auto">{children}</div>;
}
