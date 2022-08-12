export type Comment = {
  _id?: string;
  postId: string;
  comments?: Comment[];
  author: string;
  body: string;
  date: string;
};



export type SubComment = {
  commentId: string
  comment: Comment
}