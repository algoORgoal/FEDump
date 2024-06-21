import { ComponentPropsWithoutRef } from "react";

export default function Unordered(props: ComponentPropsWithoutRef<"ul">) {
  return <ul {...props} className="list-disc pl-4" />;
}
