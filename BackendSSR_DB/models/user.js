import mongoose from "mongoose";


// connecting to the mongodb
mongoose.connect("mongodb://127.0.0.1:27017/testapp");

// creating the collection schema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    imageUrl: String
});

// exporting the collection as user
export default mongoose.model("user",userSchema);