import React, { ComponentPropsWithoutRef } from "react";

export default function Anchor(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} className="hover:underline" />;
}
