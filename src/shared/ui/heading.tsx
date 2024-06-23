import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Separator } from "./separator";

export function Heading1(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <div className="my-10">
      <h1 className="text-7xl font-extrabold text-black" {...props} />
    </div>
  );
}

export function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <div className="mb-12 mt-24">
      <h2 className="text-5xl font-bold text-black" {...props} />
    </div>
  );
}

export function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <div className="mb-8 mt-16">
      <h3 className="text-3xl font-bold text-black" {...props} />
    </div>
  );
}

export function Heading4(props: ComponentPropsWithoutRef<"h4">) {
  return (
    <div className="mb-5 mt-11">
      <h4 className="text-xl font-bold text-black" {...props} />
    </div>
  );
}
