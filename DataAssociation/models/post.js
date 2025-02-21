import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/testudb');


const postSchema = mongoose.Schema({
    postData : String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: String,
        default: Date.now()
    }
});


const post = mongoose.model('post',postSchema);
export default post;