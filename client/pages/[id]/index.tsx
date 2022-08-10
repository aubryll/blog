import { NextPage } from "next";
import type { Post } from "@/components/types";
import data from "../../../api.json";
import Lodash from "lodash";
import { useRouter } from "next/router";

type PostProps = {
  post: Post;
};

const Post: NextPage<PostProps> = ({ post }) => {
  return <>{post.title}</>;
};

export const getStaticProps = async () => {
  const posts: Post[] = data;
  const router = useRouter();
  const { post } = router.query;
  const filteredPost = Lodash.find(posts, { id: post });
  return {
    props: {
      post: filteredPost,
    },
  };
};

export default Post;
