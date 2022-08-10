export type Comment = {
  id?: number;
  postId: number;
  comments?: Comment[];
  author: string;
  title: string;
  content: string;
  date: string;
};
