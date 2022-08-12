import {
  configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import commentReducer from "./reducers/comment";
import postReducer from "./reducers/post";


const store =  configureStore({
  reducer: {
    commentReducer,
    postReducer
  },
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
