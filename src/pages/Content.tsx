import React, { useState } from "react";
import { useParams } from "react-router-dom";

import DarkModeToggle from "../components/atoms/DarkModeToggle";

import Loading from "./Loading";
import SearchHeader from "../widget/post/Appbar";

import ScrollToTop from "./../components/atoms/ScrollToTop";
import ContentEditing from "../features/post/ui/ContentEditing";
import ContentView from "../widget/post/ui/ContentView";
import { useEditPost } from "../features/post";
import { useGetPostDetailsQuery } from "../entities/post";

const Content: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string };

  const { mutate: editPost } = useEditPost(id!);

  // GET
  const { data, isLoading } = useGetPostDetailsQuery(id!);

  // 수정 중인지
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 수정된 제목
  const [editedTitle, setEditedTitle] = useState<string>("");

  // 수정된 본문
  const [editedBody, setEditedBody] = useState<string>("");

  // 제목 수정 함수
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  // 본문 수정 함수
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedBody(e.target.value);
  };

  // 수정 후 제출하기 버튼을 눌렀을 때
  const handlePostEdit = async () => {
    if (data) {
      await editPost({
        id: id!,
        post: {
          ...data,
          title: editedTitle,
          body: editedBody,
        },
      });

      await setIsEditing(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  // 수정 버튼을 눌렀을 때
  const handleEditClick = () => {
    if (data !== undefined) {
      setIsEditing(true);
      setEditedTitle(data.title);
      setEditedBody(data.body);
    }
  };

  // feedData가 undefined일 때를 대비하기 위한 early return
  if (data == null) {
    return <Loading />;
  }

  return (
    <div className="font-pretendard min-h-screen w-screen bg-white dark:bg-zinc-700 text-black dark:text-white flex flex-col">
      <SearchHeader />
      <div className=" text-black sm:mx-32 pb-72">
        {isEditing ? (
          // 수정 중일 때
          <ContentEditing
            editedTitle={editedTitle}
            handleTitleChange={handleTitleChange}
            editedBody={editedBody}
            handleBodyChange={handleBodyChange}
            handleContentEditClick={handlePostEdit}
          />
        ) : (
          // 수정 중이 아닐 때
          <ContentView
            id={id}
            title={data.title}
            author={data.author}
            time={data.time}
            body={data.body}
            likes={data.likes}
            handleEditClick={handleEditClick}
            // handleContentDeleteClick = {handleContentDeleteClick} <- 미션 구현
          />
        )}
      </div>
      <DarkModeToggle />
      <ScrollToTop />
    </div>
  );
};

export default Content;
