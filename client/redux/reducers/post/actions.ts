import { Post } from "@/components/types";

export enum ActionTypes {
  POSTS_LOAD_START,
  POSTS_LOAD_SUCCESS,
  POST_LOAD_ERROR,
}

const postLoadStart = () => ({
  type: ActionTypes.POSTS_LOAD_START,
});

const postsLoadSuccess = (posts: Post[]) => ({
  type: ActionTypes.POSTS_LOAD_SUCCESS,
  payload: posts,
});

const postsLoadError = (error: Error) => ({
  type: ActionTypes.POST_LOAD_ERROR,
  payload: error,
});

export default {
  postLoadStart,
  postsLoadSuccess,
  postsLoadError,
};
