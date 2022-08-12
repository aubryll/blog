import { get } from "@/api/index";
import actions from "./actions";



export const loadPostsAsync = () => async (dispatch: any) => {
  dispatch(actions.postLoadStart());
  try {
    const posts = await get("blog/0/20");
    dispatch(actions.postsLoadSuccess(posts));
  } catch (err) {
    if (err instanceof Error) dispatch(actions.postsLoadError(err));
  }
};
