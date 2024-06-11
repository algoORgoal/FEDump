"use client";
import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../../src/App"), { ssr: false });

export default function ClientOnly() {
  return <App />;
}
