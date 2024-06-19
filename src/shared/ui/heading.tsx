import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Separator } from "./separator";

function BaseHeading({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Separator />
    </>
  );
}

export function Heading1(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <div className="my-10 space-y-7">
      <BaseHeading>
        <h1 className="font-extrabold text-4xl text-black" {...props} />
      </BaseHeading>
    </div>
  );
}

export function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <div className="my-7 space-y-5">
      <BaseHeading>
        <h2 className="font-bold text-3xl text-black" {...props} />
      </BaseHeading>
    </div>
  );
}

export function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <div className="my-5 space-y-3">
      <BaseHeading>
        <h3 className="font-bold text-2xl text-black" {...props} />
      </BaseHeading>
    </div>
  );
}

export function Heading4(props: ComponentPropsWithoutRef<"h4">) {
  return (
    <div className="my-4 space-y-2">
      <BaseHeading>
        <h4 className="font-bold text-xl text-black" {...props} />
      </BaseHeading>
    </div>
  );
}
