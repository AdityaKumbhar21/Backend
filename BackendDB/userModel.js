import mongoose from "mongoose";


// making connection with mongodb with a database name of mongodemo
mongoose.connect('mongodb://127.0.0.1:27017/mongodemo');


// making userSchema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String
});

// creating a model named user and passing the userSchema to it  and exporting the model
export default mongoose.model('user',userSchema);

