import mongoose, { Types } from "mongoose";

const postSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content: String,
    createdAt: {
        type: Date,
        default:Date.now()
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
});

const postModel = mongoose.model('Post', postSchema);
export default postModel;