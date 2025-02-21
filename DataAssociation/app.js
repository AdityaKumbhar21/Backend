import express from 'express';
const app = express();
import user from './models/userModel.js';
import post from './models/post.js';



app.get('/',(req, res)=>{
    res.send("Good");
});

app.get('/create',async (req, res) => {
    const createdUser = await user.create({
        name: "Aditya",
        email: "Aditya@ak.com",
    });

    res.send(createdUser);
});
// 67b85b713a6fc8deafac08fd

app.get('/createPost',async (req, res) => {
    const createdPost = await post.create({
        postData: "This is post data",
        user: "67b85b713a6fc8deafac08fd"
    });

    const currUser = await user.findOne({_id:"67b85b713a6fc8deafac08fd"});
    currUser.posts.push(createdPost._id);
    await currUser.save();
    res.send({createdPost, currUser});
})



app.listen(3000);