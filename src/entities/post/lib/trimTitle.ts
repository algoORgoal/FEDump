export const trimTitle = (title: string) => {
  const MAX_LENGTH = 12;
  const trimmedTitle =
    title.length > MAX_LENGTH ? title.substring(0, MAX_LENGTH) + "..." : title;

  return trimmedTitle;
};
