import { Fragment } from "react";
import { trimTitle } from "../lib/trimTitle";
import Link from "next/link";

export const PostCard = ({
  post,
  stats,
}: {
  post: {
    slug: string;
    title: string;
    publishedAt: string;
  };
  stats?: {
    likes: number;
    views: number;
  };
}) => {
  const { title, publishedAt, slug } = post;
  const trimmedTitle = trimTitle(title);

  return (
    <li
      className="w-full h-auto bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white border-b-2
    overflow-hidden p-4 flex flex-col justify-between transform transition-all duration-300 ease-in-out hover:scale-105 relative"
    >
      <div>
        <div className="font-bold text-lg">{trimmedTitle}</div>
      </div>
      <div>
        <div className="text-left text-zinc-500 text-xs ">
          {new Date(publishedAt).toDateString()}
        </div>
        <div className="flex justify-between items-center mt-2">
          {stats &&
            Object.values(stats).map((stat, index) => (
              <Fragment key={index}>{stat}</Fragment>
            ))}
        </div>
      </div>
      <Link
        href={`/posts/${slug}`}
        className="absolute inset-0 cursor-pointer"
      />
    </li>
  );
};
