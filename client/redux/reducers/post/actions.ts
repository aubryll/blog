import { get, post } from "@/api/index";
import { Post } from "@/components/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

type getPostProps = {
  page?: number;
  pageSize?: number;
};

export const getPosts = createAsyncThunk(
  "posts",
  async ({ page = 0, pageSize = 20 }: getPostProps) =>{
    const response = await get(`blog/${page}/${pageSize}`)
    return {
      data: response.data,
      page
    }
  });

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (blogPost: Post) => await post("blog/create", blogPost)
);
