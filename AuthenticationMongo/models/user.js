import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = mongoose.Schema({
    name:String,
    email: String,
    password: String
});

export default mongoose.model("user",userSchema);