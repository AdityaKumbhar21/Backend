import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/testudb');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    // referencing the post model for the data
    posts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});


const user = mongoose.model('user',userSchema);
export default user;