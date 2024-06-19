import { CreateNewPostButton } from "../src/features/post";

interface Props {
  // 필터는 9주차 미션에서 미사용
  // onFilterChange: React.Dispatch<React.SetStateAction<string>>;
}

const BoardFilterLine: React.FC<Props> = () => {
  return (
    <div className="flex justify-between sm:mx-32 my-4">
      <CreateNewPostButton />
    </div>
  );
};

export default BoardFilterLine;
