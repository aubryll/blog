import { Post } from "@/components/types";
import { createReducer } from "@reduxjs/toolkit";
import { getPost } from "./actions";

export type PostState = {
    post?: Post;
    pending: boolean;
    error: boolean;
  };
  

  const initialState: PostState = {
    pending: false,
    error: false,
  };
  
  const postReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.pending = true;
      })
      .addCase(getPost.rejected, (state) => {
        state.pending = true;
        state.error = true;
      })
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.error = false;
        state.post = payload.data;
      })
  });

  export default postReducer