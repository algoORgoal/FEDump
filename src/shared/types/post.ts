export type Post = {
  id: string;
  title: string;
  body: string;
  time: string;
  comments: {
    writer: string;
    content: string;
  }[];
  author: string;
  likes: number;
};

// endpoint가 /result가 되었으므로 CareResponse는 더 이상 사용하지 않음
export type CardResponse = {
  code: number;
  status: number;
  message: string;
  result: Post;
  messages: string;
  totalPages: number;
};
