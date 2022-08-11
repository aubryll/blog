import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    date: {type: Date, default: Date.now},
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment"
    }]
});
const Blog = mongoose.model("Blog", blogSchema);
export default Blog