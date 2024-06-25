"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useSetSearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(pathname + "?" + params);
    },
    [pathname, router, searchParams],
  );

  return setSearchParams;
}
