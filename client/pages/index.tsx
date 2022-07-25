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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import data from "../api.json";
import { formatDistance, format } from "date-fns";
import Lodash from "lodash";

//Types
type BlogPostsProps = {};

type BlogForm = {
  username: string;
  content: string;
};

type Post = {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
};

//Utils
const stringAvatar = (name: string) => {
  return {
    children: `${name.split(" ")[0][0]}`,
  };
};

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
            <Typography
              variant="body1"
              component="span"
              color="text.secondary"
            >
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

//Blost posts functional component
const BlogPosts: NextPage<BlogPostsProps> = ({}) => {
  const { handleSubmit, control } = useForm<BlogForm>({
    defaultValues: {
      username: "",
    },
  });

  const posts: Post[] = data;
  const postBlog = (data: BlogForm) => {};

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack>
          <Typography gutterBottom variant="h1">
            Blog posts
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>{Lodash.map(posts, renderPost)}</List>
      </Grid>
    </Grid>
  );
};

export default BlogPosts;
