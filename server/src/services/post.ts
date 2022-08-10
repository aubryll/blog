import { v4 as generateId } from "uuid";
/**
 * @function getAllPosts return all posts from the DB
 * @function createPost creates a new Post
 */

type Post = {
  id?: string;
  author: string;
  title: string;
  content: string;
  date: string;
};

module.exports = (database: any) => {
  const getAllPosts = (page: number, pageSize: number) => {
    const posts = database.client.db("posts").collection("posts");
    const response: Post[] = posts
      .sort({ id: -1 })
      .limit(pageSize)
      .skip(pageSize * page)
      .toArray();
    return response;
  };

  /**
   * @param {Post} post The contents of the post
   * @returns The object of the created post || The error that is caught during the DB insert
   */
  const createPost = (post: Post) => {
    const newPost = { ...post, id: generateId() };
    database.client.db("todos").collection("todos").insertOne(newPost);
    return newPost;
  };

  return {
    getAllPosts,
    createPost,
  };
};
