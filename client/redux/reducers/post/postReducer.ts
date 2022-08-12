import { Post } from "@/components/types";

export type PostState = {
    post?: Post;
    pending: boolean;
    error: boolean;
  };
  

  const initialState: PostState = {
    pending: false,
    error: false,
  };
  