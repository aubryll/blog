import type { Post } from "@/components/types";
import { ActionTypes } from "./actions";

type State = {
  posts?: Post[];
  isLoading: boolean;
  error?: Error;
};

const initialState: State = {
  posts: [],
  isLoading: false,
};

const postReducer = (
  state = initialState,
  { type, payload }: { type: ActionTypes; payload: any }
) => {
  switch (type) {
    case ActionTypes.POSTS_LOAD_START: {
      const updatedState: State = {
        ...state,
        isLoading: true,
      };
      return updatedState;
    }

    case ActionTypes.POSTS_LOAD_SUCCESS: {
      const updatedState: State = {
        ...state,
        isLoading: false,
        posts: payload,
      };
      return updatedState;
    }

    case ActionTypes.POST_LOAD_ERROR: {
      const updatedState: State = {
        ...state,
        isLoading: false,
        error: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default postReducer;
