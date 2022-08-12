import { get, post } from "@/api/index";
import { Comment, Post, SubComment } from "@/components/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

type getPostProps = {
  page?: number;
  pageSize?: number;
};

export const getPosts = createAsyncThunk(
  "posts",
  async ({ page = 0, pageSize = 20 }: getPostProps) => {
    const response = await get(`blog/${page}/${pageSize}`);
    return {
      data: response.data,
      page,
    };
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (blogPost: Post) => await post("blog/create", blogPost)
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (postId: string) => {
    const response = await get(`comments/${postId}`);
    return {
      data: response.data,
    };
  }
);

export const addComment = createAsyncThunk(
  "posts/getPost/addComment",
  async (comment: Comment) => await post("comments/create", comment)
);

export const addSubComment = createAsyncThunk(
  "posts/getPost/comment/addComment",
  async (comment: SubComment) => await post("comments/comment/create", comment)
);
