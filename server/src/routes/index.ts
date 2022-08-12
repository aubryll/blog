import express from "express";
import Blog from "../models/blog";
import Comment from "../models/comment";
const router = express.Router();

router.get("/blog/:page/:pageSize", (req: any, res: any) => {
  const { page, pageSize } = req.params;
  Blog.find({})
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .exec((err, blogs) => {
      if (err) {
        console.error(err);
        res.status(400).end();
      } else {
        res.status(200).json(blogs);
      }
    });
});

router.post("/blog/create", (req: any, res: any) => {
  const { body } = req;
  Blog.create(body, (err, newBlog) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    } else {
      newBlog.save();
      res.status(201).send(newBlog);
    }
  });
});

router.get("/comments/:postId", (req: any, res: any) => {
  const { postId } = req.params;
  Blog.findById(postId)
    .populate("comments")
    .populate({
      path: 'comments',
      populate: {
        path: 'comments'
      }
    })
    .sort({ _id: -1 })
    .exec((err, blogs) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(200).json(blogs);
      }
    });
});

router.post("/comments/create", (req: any, res: any) => {
  const { body } = req;
  const { postId } = body;
  delete body.postId;
  Blog.findById(postId)
  .populate("comments")
  .populate("comments.comments")
    .exec((err, foundBlog) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Comment.create(body, (err, newComment) => {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            foundBlog.comments.push(newComment);
            foundBlog.save();
            res.status(201).json(foundBlog.comments);
          }
        });
      }
    });
});

router.post("/comments/comment/create", (req: any, res: any) => {
  const { body } = req;
  const { commentId, comment } = body;
  delete body.postId;

  Comment.findById(commentId)
  .populate("comments")
  .populate("comments.comments")
    .exec((err, foundComment) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Comment.create(comment, (err, newComment) => {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            foundComment.comments.push(newComment);
            foundComment.save();
            res.status(201).json(foundComment.comments);
          }
        });
      }
    });
});

module.exports = router;
