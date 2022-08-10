import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "@/components/types";


type State = {
  comments: Comment[];
};

const initialState: State = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addPost: (state: State, action: PayloadAction<Comment>) => {
      return { ...state, comments: [...state.comments, action.payload] };
    },
  },
});

export const { addPost } = commentSlice.actions;
export default commentSlice.reducer;
