import React, { ComponentPropsWithoutRef } from "react";

export default function Paragraph(props: ComponentPropsWithoutRef<"h4">) {
  return <p className="text-base font-normal text-black" {...props} />;
}
