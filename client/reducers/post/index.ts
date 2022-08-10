import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "@/components/types";


type State = {
  posts: Post[];
};

const initialState: State = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state: State, action: PayloadAction<Post>) => {
      return { ...state, posts: [...state.posts, action.payload] };
    },
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
