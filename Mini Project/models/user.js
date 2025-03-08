const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);