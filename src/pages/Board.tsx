import BoardIntroduce from "../widget/post/ui/BoardIntroduce";
import BoardFilterLine from "../widget/post/ui/BoardFilterLine";
import DarkModeToggle from "../components/atoms/DarkModeToggle";
import Feed from "../widget/post/ui/Feed";
import ScrollToTop from "./../components/atoms/ScrollToTop";

const Board = () => {
  return (
    <div className="min-h-screen w-screen bg-white dark:bg-zinc-700 flex flex-col">
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
