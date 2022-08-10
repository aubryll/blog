import React, { useState } from "react";
import type { NextPage } from "next";
import {
  Grid,
  Typography,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  Stack,
  Fab,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import data from "../api.json";
import { formatDistance } from "date-fns";
import Lodash from "lodash";
import { FormDialog } from "@/components/dialog";
import type { Form, Post } from "@/components/types";
import Link from "next/link";

/**
 * Prop type for this component
 */
type BlogPostsProps = {
  posts: Post[];
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
    <Link key={index} href={`/post/${id}`}>
      <ListItem button alignItems="flex-start">
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
              <Typography
                variant="body2"
                component="span"
                color="text.secondary"
              >
                {formatDistance(new Date(date), new Date(), {
                  addSuffix: true,
                })}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </Link>
  );
};

/**
 * This file's major component, which is in charge of loading and producing new entries.
 * @param param0
 * @returns
 */
const BlogPosts: NextPage<BlogPostsProps> = ({ posts }) => {
  const newPosts = Lodash.take(posts, 10);
  const [dialogFormOpen, setDialogFormOpen] = useState(false);

  const forms = useForm<Form>({
    defaultValues: {
      username: "",
      content: "",
    },
  });
  const { control } = forms;

  const toggleDialogForm = () => setDialogFormOpen((prev) => !prev);

  const createPost = (data: Form) => {
    console.log("Data: ", JSON.stringify(data));
    toggleDialogForm();
  };

  return (
    <>
      <FormDialog
        open={dialogFormOpen}
        forms={forms}
        title={"Create a new blog post"}
        submit={createPost}
        onClose={toggleDialogForm}
        scroll="paper"
      >
        <Controller
          name="username"
          control={control}
          rules={{
            required: "Enter your email address",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={"Email address"}
              placeholder={"What is your email address?"}
              fullWidth
              type="email"
              variant="standard"
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          rules={{
            required: "Enter your email address",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Post"
              placeholder="What is on your mind?"
              fullWidth
              multiline
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              minRows={5}
              onChange={onChange}
              variant="standard"
            />
          )}
        />
      </FormDialog>
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
          <List disablePadding>{Lodash.map(newPosts, renderPost)}</List>
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
        onClick={toggleDialogForm}
      >
        New Post
      </Fab>
    </>
  );
};

export const getStaticProps = async () => {
  const posts: Post[] = data;
  return {
    props: {
      posts: posts,
    },
  };
};

export default BlogPosts;
