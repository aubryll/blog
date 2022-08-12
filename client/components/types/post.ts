 export type Post = {
    _id?: string;
    author: string;
    title: string;
    body: string;
    date?: string;
    comments?: Comment[]
  };
  