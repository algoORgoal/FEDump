import React, { ComponentPropsWithoutRef } from "react";

export default function Paragraph(props: ComponentPropsWithoutRef<"h4">) {
  return <p className="font-normal text-black text-base" {...props} />;
}
