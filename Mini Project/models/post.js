const mongoose = require('mongoose');

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

module.exports=  mongoose.model('Post', postSchema);
