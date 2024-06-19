import { Fragment } from "react";
import { trimTitle } from "../lib/trimTitle";
import Link from "next/link";

export const Card = ({
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
    <div className="relative flex h-auto w-full transform flex-col justify-between overflow-hidden border-b-2 bg-white p-4 text-zinc-700 transition-all duration-300 ease-in-out hover:z-10 hover:scale-105 dark:bg-zinc-700 dark:text-white">
      <div>
        <div className="text-lg font-bold">{trimmedTitle}</div>
      </div>
      <div>
        <div className="text-left text-xs text-zinc-500">
          {new Date(publishedAt).toDateString()}
        </div>
        <div className="mt-2 flex items-center justify-between">
          {stats &&
            Object.values(stats).map((stat, index) => (
              <Fragment key={index}>{stat}</Fragment>
            ))}
        </div>
      </div>
      <Link href={`/${slug}`} className="absolute inset-0 cursor-pointer" />
    </div>
  );
};
