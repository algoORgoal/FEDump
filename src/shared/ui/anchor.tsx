import React, { ComponentPropsWithoutRef } from "react";

export default function Anchor(props: ComponentPropsWithoutRef<"a">) {
  console.dir(props);
  return <a {...props} className="hover:underline" />;
}
