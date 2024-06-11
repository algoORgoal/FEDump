import { ReactNode } from "react";

interface LikeStatProps {
  likeButton: ReactNode;
  likes: number;
}

export const LikeStat: React.FC<LikeStatProps> = ({ likeButton, likes }) => {
  return (
    <div className="flex gap-x-2 items-center">
      {likeButton}
      <div>{likes}</div>
    </div>
  );
};
