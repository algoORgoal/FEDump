import React, { FC } from "react";
import { useLikePost } from "..";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

interface LikeButtonProps {
  id: string;
  likes: number;
}

export const LikeButton: FC<LikeButtonProps> = ({
  id,
  likes,
}: LikeButtonProps) => {
  const { mutate: likePost } = useLikePost(id);

  const handleClick = async () => {
    await likePost({ likes, id });
  };

  return (
    <div className="items-center flex gap-x-2">
      <button type="button" onClick={handleClick} className="z-10">
        <FavoriteBorder />
      </button>
    </div>
  );
};
