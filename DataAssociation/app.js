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
    
    //creating a post.
    const createdPost = await post.create({
        postData: "This is post data",
        user: "67b85b713a6fc8deafac08fd"
    });

    // finding the user of the created post
    const currUser = await user.findOne({_id:"67b85b713a6fc8deafac08fd"});
    // pushing the created post in the posts array of the user
    currUser.posts.push(createdPost._id);
    // saving the userData
    await currUser.save();
    res.send({createdPost, currUser});
});



app.listen(3000);