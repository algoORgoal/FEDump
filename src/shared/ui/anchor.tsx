import React, { ComponentPropsWithoutRef } from "react";

export default function Anchor({
  isHeading,
  ...props
}: ComponentPropsWithoutRef<"a"> & { isHeading?: boolean }) {
  return (
    <a
      {...props}
      className={`${isHeading ? "hover:underline" : "underline"}`}
    />
  );
}
