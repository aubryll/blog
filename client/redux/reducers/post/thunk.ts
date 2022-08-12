import { get } from "@/api/index";
import { Dispatch } from "@reduxjs/toolkit";
import actions from "./actions";

const loadPostsAsync = () => async (dispatch: Dispatch) => {
  dispatch(actions.postLoadStart());
  try {
    const posts = await get("blog/0/20");
    dispatch(actions.postsLoadSuccess(posts));
  } catch (err) {
    if (err instanceof Error) dispatch(actions.postsLoadError(err));
  }
};
