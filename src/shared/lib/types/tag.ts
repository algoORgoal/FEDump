export const tags = [
  "testing",
  "storybook",
  "styling",
  "rest-api",
  "performance",
  "api",
  "CI/CD",
  "fundamentals",
  "my life",
] as const;

export type Tag = (typeof tags)[number];
