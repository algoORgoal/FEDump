import React, { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";
import { trimTitle } from "../src/entities/post/lib/trimTitle";

interface CardProps {
  post: {
    id: string;
    title: string;
    time: string;
    comments: {
      writer: string;
      content: string;
    }[];
    author: string;
  };
  stats: ReactNode[];
}

export const Card: React.FC<CardProps> = ({ post, stats }) => {
  const { id, title, time, comments, author } = post;
  const trimmedTitle = trimTitle(title);

  return (
    <div
      className="w-full md:w-1/3 h-auto bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white border-b-2
    overflow-hidden p-4 flex flex-col justify-between transform transition-all duration-300 ease-in-out hover:scale-105 relative"
    >
      <div>
        <div className="font-bold text-lg">
          {trimmedTitle} [{comments.length}]
        </div>
      </div>
      <div>
        <div className="text-left text-zinc-500 text-xs ">{time}</div>
        <div className="flex justify-between items-center mt-2">
          <div>{author}</div>
          {stats.map((stat, index) => (
            <Fragment key={index}>{stat}</Fragment>
          ))}
        </div>
      </div>
      <Link to={`/content/${id}`} className="absolute inset-0 cursor-pointer" />
    </div>
  );
};

export const PostCard = ({
  post,
  stats,
}: {
  post: {
    title: string;
    publishDate: string;
  };
  stats?: {
    likes: number;
    views: number;
  };
}) => {
  const { title, publishDate } = post;
  const trimmedTitle = trimTitle(title);

  return (
    <li
      className="w-full md:w-1/3 h-auto bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white border-b-2
    overflow-hidden p-4 flex flex-col justify-between transform transition-all duration-300 ease-in-out hover:scale-105 relative"
    >
      <div>
        <div className="font-bold text-lg">{trimmedTitle}</div>
      </div>
      <div>
        <div className="text-left text-zinc-500 text-xs ">{publishDate}</div>
        <div className="flex justify-between items-center mt-2">
          {stats &&
            Object.values(stats).map((stat, index) => (
              <Fragment key={index}>{stat}</Fragment>
            ))}
        </div>
      </div>
      {/* <Link to={`/content/${id}`} className="absolute inset-0 cursor-pointer" /> */}
    </li>
  );
};
