import { Lang } from "@/src/shared/lib/types/lang";

const getActiveLangs = (
  langs: Readonly<Lang[]>,
  searchLang: string | null,
  searchTag: string | null,
) => {
  console.log(searchTag);
  if (!searchTag) {
    return [];
  }

  return langs.filter((lang) => !searchLang || lang === searchLang);
};

export default getActiveLangs;
