import React, { ComponentPropsWithoutRef } from "react";

export default function Ordered(props: ComponentPropsWithoutRef<"ol">) {
  return <ol {...props} className="list-decimal pl-4" />;
}
