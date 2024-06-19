"use client";

import BoardIntroduce from "./BoardIntroduce";
import BoardFilterLine from "./BoardFilterLine";
import DarkModeToggle from "./components/atoms/DarkModeToggle";
import Feed from "./Feed";
import ScrollToTop from "./components/atoms/ScrollToTop";

const Board = () => {
  return (
    <div>
      <div className="h-64  flex-shrink-0">
        <BoardIntroduce />
      </div>
      <div className="px-8">
        <div>
          <BoardFilterLine />
        </div>
        <hr className="border-gray-300 dark:border-white" />
        <Feed />
      </div>
      <DarkModeToggle />
      <ScrollToTop />
    </div>
  );
};

export default Board;
