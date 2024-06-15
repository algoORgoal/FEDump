import React, { ComponentPropsWithRef } from "react";

export default function Unordered(props: ComponentPropsWithRef<"ul">) {
  return <ul {...props} className="list-disc" />;
}
