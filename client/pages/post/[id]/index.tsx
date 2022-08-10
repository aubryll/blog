import { NextPage } from "next";
import type { Post } from "@/components/types";
import data from "../../../api.json";
import Lodash from "lodash";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  Divider,
  Stack,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { Form } from "@/components/types";

type PostProps = {
  post: Post;
};

const Post: NextPage<PostProps> = ({
  post: { id, author, title, content, date },
}) => {
  const router = useRouter();
  const forms = useForm<Form>({
    defaultValues: {
      username: "",
      content: "",
    },
  });
  const { control } = forms;

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack>
            <Typography gutterBottom variant="h1">
              {title}
            </Typography>
            <Divider />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="body1">
            {content}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ flex: 1 }} variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Controller
                  name="username"
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
                      variant="outlined"
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
                      variant="outlined"
                    />
                  )}
                />
                <Button variant="contained">Save comment</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticPaths = async () => {
  const posts: Post[] = data;
  const paths = Lodash.map(posts, (post: Post) => ({
    params: { id: post.id.toString() },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { id } }: any) => {
  const posts: Post[] = data;
  const filteredPost = Lodash.find(posts, { id: Number(id) });
  return {
    props: {
      post: filteredPost,
    },
  };
};

export default Post;
