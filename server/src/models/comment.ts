import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    body: String,
    author: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment"
    }]
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment