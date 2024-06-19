import { useNavigate } from "react-router-dom";

import PencilSquareIcon from "@/public/pencilSquare.svg";

import useStore from "../src/store/useDarkModeStore";

export const CreateNewButton = () => {
  const darkMode = useStore((state) => state.darkMode);

  const navigate = useNavigate();

  return (
    <button
      className="bg-transparent flex items-center gap-x-2"
      onClick={() => navigate("/write")}
    >
      <PencilSquareIcon
        height={16}
        width={16}
        stroke={darkMode ? "white" : "black"}
      />
      <div className="text-bold text-black dark:text-white ">글쓰기</div>
    </button>
  );
};
