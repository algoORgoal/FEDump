import React from "react";

import { IconButton } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { PostLikeButton, useDeletePost } from "../src/features/post";
import { LikeStat } from "../src/entities/post";

interface Props {
  id: string;
  title: string;
  author: string;
  time: string;
  body: string;
  likes: number;
  handleEditClick: () => void;

  // handleContentDeleteClick <- 미션 구현

  // 좋아요 버튼을 눌렀을 때
  // handleLikeClick <- 미션 구현
}

const ContentView: React.FC<Props> = ({
  id,
  title,
  author,
  time,
  body,
  likes,
  handleEditClick,
}) => {
  const { mutate: deletePost } = useDeletePost(id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deletePost(id);
    navigate("/");
  };

  return (
    <>
      <div className="text-2xl font-bold dark:text-white mt-4">{title}</div>
      <div className="text-sm text-gray-400 dark:text-white mt-4">
        {author} | {time}
      </div>
      <div className="h-auto bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg mt-10 p-4 ">
        {body}
      </div>
      <div className="flex justify-between mt-10">
        <LikeStat
          likes={likes}
          likeButton={<PostLikeButton likes={likes} id={id} />}
        />

        <div className="flex gap-x-2 whitespace-nowrap">
          {/* 수정 버튼 */}
          <IconButton aria-label="fix" onClick={handleEditClick}>
            <BuildIcon sx={{ color: "black" }} className="dark:text-white" />
          </IconButton>

          {/* 삭제 버튼 미션 구현*/}
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon sx={{ color: "black" }} className="dark:text-white" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ContentView;
