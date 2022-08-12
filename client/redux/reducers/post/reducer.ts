import type { Post } from "@/components/types";
import { createReducer } from "@reduxjs/toolkit";
import { getPosts } from "./actions";

type State = {
  posts?: Post[];
  pending: boolean;
  error: boolean;
};

const initialState: State = {
  posts: [],
  pending: false,
  error: false,
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
    });
});

export default postReducer;
