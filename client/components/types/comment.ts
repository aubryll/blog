export type Comment = {
  _id?: string;
  postId: number;
  comments?: Comment[];
  author: string;
  body: string;
  date: string;
};
