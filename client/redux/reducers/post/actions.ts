import { get } from "@/api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts =
  createAsyncThunk("posts", async () => await get("blog/0/20"));
