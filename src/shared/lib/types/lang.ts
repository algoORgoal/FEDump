export const langs = ["ko", "en"] as const;

export type Lang = (typeof langs)[number];
