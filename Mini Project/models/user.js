import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/miniProject');


const userSchema = mongoose.Schema({
    name : String, 
    email: String,
    username: String, 
    password: String,
    posts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
});

const userModel = mongoose.model('User', userSchema);
export default userModel;