import { NextPage } from "next";
import type { Comment, Post } from "@/components/types";
import Lodash from "lodash";
import { wrapper } from "redux/store";
import { addComment, addSubComment, getPost } from "redux/reducers/actions";
import { useDispatch, useSelector } from "react-redux";
import { PostState } from "redux/reducers/postReducer";
import {
  Grid,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  Stack,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { stringAvatar } from "pages";
import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { useRouter } from "next/router";
import { FormDialog } from "@/components/dialog";

type PostProps = {
  post: Post;
};

type Form = {
  title: string;
  author: string;
  body: string;
};

const renderSubComment = (
  { _id, author, body, date }: Comment,
  index: number
) => {
  return (
    <ListItem
      key={_id}
      button
      alignItems="flex-start"
      sx={{
        marginLeft: 10,
      }}
    >
      <ListItemAvatar>
        <Avatar alt={author} {...stringAvatar(author)} />
      </ListItemAvatar>
      <ListItemText
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
              {` — ${body}`}
            </Typography>
            <br />
            <Typography variant="body2" component="span" color="text.secondary">
              {formatDistance(new Date(date ?? Date.now()), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

const Post: NextPage<PostProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [commentId, setCommentId] = useState<string>();

  const postState: PostState = useSelector((state: any) => state.post);
  const { post, pending, error } = postState;

  const forms = useForm<Form>({
    defaultValues: {
      author: "",
      body: "",
    },
  });
  const toggleDialogForm = () => setDialogFormOpen((prev) => !prev);

  const { control, handleSubmit } = forms;

  const submitComment = (data: Form) => {
    // @ts-ignore
    dispatch(addComment({ postId: id, ...data }));
    // @ts-ignore
    dispatch(getPost(id));
  };

  const submitSubComment = (data: Form) => {
    if (commentId)
      dispatch(
        // @ts-ignore
        addSubComment({ postId: id, commentId: commentId, comment: data })
      );
    // @ts-ignore
    dispatch(getPost(id));
  };

  const renderComment = (
    { _id, author, body, date, comments }: Comment,
    index: number
  ) => {
    return (
      <React.Fragment key={_id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={author} {...stringAvatar(author)} />
          </ListItemAvatar>
          <ListItemText
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
                  {` — ${body}`}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  component="span"
                  color="text.secondary"
                >
                  {formatDistance(new Date(date ?? Date.now()), new Date(), {
                    addSuffix: true,
                  })}
                </Typography>
                <Button
                  sx={{ mr: 3, ml: 3 }}
                  onClick={() => {
                    setCommentId(_id);
                    toggleDialogForm();
                  }}
                >
                  Reply
                </Button>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" />
        <List disablePadding sx={{ mb: 5 }}>
          {Lodash.map(comments, renderSubComment)}
        </List>
      </React.Fragment>
    );
  };

  return (
    <>
      <FormDialog
        open={dialogFormOpen}
        forms={forms}
        title={"Reply to comment"}
        submit={submitSubComment}
        onClose={toggleDialogForm}
        scroll="paper"
      >
        <Controller
          name="author"
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
          name="body"
          control={control}
          rules={{
            required: "Enter your comment",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Comment"
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
              {post?.title}
            </Typography>
            <Divider flexItem={true} />
            <Typography>{post?.body}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(submitComment)}>
            <Card variant="outlined">
              <CardHeader title="Add a comment" />
              <CardContent>
                <Controller
                  name="author"
                  control={control}
                  rules={{
                    required: "Enter your email address",
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
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
                  name="body"
                  control={control}
                  rules={{
                    required: "Enter your comment",
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Comment"
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
              </CardContent>
              <CardActions>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
        <Grid item xs={12}>
          <List disablePadding>
            {Lodash.map(post?.comments, renderComment)}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

Post.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) =>
    async ({ query }) => {
      const post = query.id;
      await dispatch(getPost(post as string));
    }
);

export default Post;
