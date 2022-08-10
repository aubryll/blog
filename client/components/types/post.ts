/**
 * A format used in blog posts data fetcher.
 * Each field in this type object should be named after a certain property.
 */
 export type Post = {
    id: number;
    author: string;
    title: string;
    content: string;
    date: string;
  };
  