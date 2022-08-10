import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./reducers/comment";
import postReducer from "./reducers/post";

export default configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
  },
});
