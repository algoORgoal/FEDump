import "../../src/index.css";
import ClientOnly from "./client";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return <ClientOnly />; // We'll update this
}
