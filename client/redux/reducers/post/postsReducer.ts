import type { Post } from "@/components/types";
import { createReducer } from "@reduxjs/toolkit";
import { addPost, getPosts } from "./actions";

export type PostState = {
  posts?: Post[];
  pending: boolean;
  error: boolean;
  page: number;
};

const initialState: PostState = {
  posts: [],
  pending: false,
  error: false,
  page: 0
};

const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getPosts.pending, (state) => {
      state.pending = true;
    })
    .addCase(getPosts.rejected, (state) => {
      state.pending = true;
      state.error = true;
    })
    .addCase(getPosts.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.error = false;
      state.posts = payload.data;
      state.page = payload.page;
    })
    .addCase(addPost.pending, (state) => {
      state.pending = true;
    })
    .addCase(addPost.rejected, (state) => {
      state.pending = true;
      state.error = true;
    })
    .addCase(addPost.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.error = false;
      state.posts = [payload.data,...(state.posts ?? [])];
    });
});

export default postReducer;
