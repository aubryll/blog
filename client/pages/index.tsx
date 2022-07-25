import React from "react";
import type { NextPage } from "next";
import {
  Grid,
  TextField,
  IconButton,
  Card,
  CardContent,
  Button,
  Typography,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  Stack,
  Fab,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import data from "../api.json";
import { formatDistance, format } from "date-fns";
import Lodash from "lodash";
import { Add } from "@mui/icons-material";

/**
 * Prop type for this component
 */
type BlogPostsProps = {
  posts: Post[];
};

/**
 * A format used in blog post creation form.
 * Each field in this type object should be named after a certain property.
 */
type BlogForm = {
  username: string;
  content: string;
};

/**
 * A format used in blog posts data fetcher.
 * Each field in this type object should be named after a certain property.
 */
type Post = {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
};

/**
 * A utility function that returns the
 * first character or characters of a supplied name or names.
 * @param name
 * @returns
 */
const stringAvatar = (name: string) => {
  return {
    children: `${name.split(" ")[0][0]}`,
  };
};

/**
 * Each blog article in the list is rendered
 * using a utility function.
 * @param Post
 * @param index
 * @returns
 */
const renderPost = (
  { id, author, title, content, date }: Post,
  index: number
) => {
  return (
    <ListItem key={index} button alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={author} {...stringAvatar(author)} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="subtitle2">{title}</Typography>}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {author}
            </Typography>
            <Typography variant="body1" component="span" color="text.secondary">
              {` — ${content}`}
            </Typography>
            <br />
            <Typography variant="body2" component="span" color="text.secondary">
              {formatDistance(new Date(date), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

/**
 * This file's major component, which is in charge of loading and producing new entries.
 * @param param0
 * @returns
 */
const BlogPosts: NextPage<BlogPostsProps> = ({ posts }) => {
  const { handleSubmit, control } = useForm<BlogForm>({
    defaultValues: {
      username: "",
    },
  });

  const createPost = (data: BlogForm) => {};

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack>
            <Typography gutterBottom variant="h1">
              Blog posts
            </Typography>
            <Divider />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <List disablePadding>{Lodash.map(posts, renderPost)}</List>
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
      >
        <Add sx={{ mr: 1 }} />
        New Post
      </Fab>
    </>
  );
};

export async function getStaticProps() {
  const posts: Post[] = data;
  return {
    props: {
      posts,
    },
  };
}

export default BlogPosts;
