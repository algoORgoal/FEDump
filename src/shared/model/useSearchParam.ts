import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useSearchParam(
  key: string,
): [string | null, (value: string) => void] {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams()!;
  const value = searchParams.get(key);

  const setValue = useCallback(
    (value: string): void => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(pathname + "?" + params);
    },
    [key, pathname, router, searchParams],
  );

  return [value, setValue];
}
