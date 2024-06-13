import { LikeStat, PostCard, useGetPostPage } from "../../../entities/post";

import Loading from "../../../pages/Loading";
import { PostLikeButton } from "../../../features/post";

import React, { useCallback, useEffect, useRef } from "react";

const useIntersection = (
  onIntersection: (entry: IntersectionObserverEntry) => void
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersection(entry);
        }
      });
    },
    [onIntersection]
  );

  useEffect(() => {
    console.log(ref);
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, ref]);

  return ref;
};

const Feed: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPostPage();

  const canLoadNextPage = !isFetchingNextPage && hasNextPage;
  console.log(canLoadNextPage);

  const a = useCallback(() => {
    if (canLoadNextPage) {
      fetchNextPage();
    }
  }, [canLoadNextPage, fetchNextPage]);

  // const intersectionRef = useIntersection(() => {
  //   if (canLoadNextPage) {
  //     fetchNextPage();
  //   }
  // });

  const intersectionRef = useIntersection(a);

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <>{error.message}</>;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-y-5 my-20">
        {data.pages.map((page) =>
          page.data.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              stats={[
                <LikeStat
                  likes={post.likes}
                  likeButton={
                    <PostLikeButton likes={post.likes} id={post.id} />
                  }
                />,
              ]}
            />
          ))
        )}
      </div>
      <div ref={intersectionRef} />
    </>
  );

  // const { data: matchingPostList, isLoading: isPostListLoading } =
  //   useMatchingPostList();

  // if (isPostListLoading) {
  //   return <Loading />;
  // }

  // if (matchingPostList.length === 0) {
  //   return (
  //     <div
  //       className="flex h-full text-zinc-700 dark:text-white flex-grow"
  //       style={{ height: "500px" }}
  //     >
  //       <div className="flex justify-center items-center">
  //         아직 글이 없습니다.
  //       </div>
  //     </div>
  //   );
  // }

  // const postCards = matchingPostList.map((post: Post) => {
  //   return (
  //     <PostCard
  //       key={post.id}
  //       post={post}
  //       stats={[
  //         <LikeStat
  //           likes={post.likes}
  //           likeButton={<PostLikeButton likes={post.likes} id={post.id} />}
  //         />,
  //       ]}
  //     />
  //   );
  // });

  // return (
  //   <>
  //     <div className="flex flex-col items-center gap-y-5 my-20">
  //       {postCards}
  //     </div>
  //   </>
  // );
};

export default Feed;
