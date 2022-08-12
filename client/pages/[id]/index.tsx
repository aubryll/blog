import { NextPage } from "next";
import type { Post } from "@/components/types";
import Lodash from "lodash";
import { wrapper } from "redux/store";
import { getPost } from "redux/reducers/post/actions";
import { useDispatch, useSelector } from "react-redux";
import { PostState } from "redux/reducers/post/postReducer";
import {
  Grid,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  Stack,
  Fab,
  TextField,
  Typography,
  Button,
} from "@mui/material";

type PostProps = {
  post: Post;
};

const Post: NextPage<PostProps> = () => {
  const dispatch = useDispatch()
  const postState: PostState = useSelector((state: any) => state.post);
  const { post, pending, error } = postState

  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <Stack>
        <Typography gutterBottom variant="h1">
          {post?.title}
        </Typography>
        <Divider flexItem={true}/>
        <Typography>{post?.body}</Typography>
      </Stack>
    </Grid>
    <Grid item xs={12}>
      
    </Grid>
  </Grid>
  )
};


Post.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch,}) =>
    async ({query}) => {
      const post  = query.id
      await dispatch(getPost(post as string));
    }
);


export default Post;
