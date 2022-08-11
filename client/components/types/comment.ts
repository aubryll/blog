export type Comment = {
  id?: string;
  postId: number;
  comments?: Comment[];
  author: string;
  title: string;
  content: string;
  date: string;
};
