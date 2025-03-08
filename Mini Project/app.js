const express = require("express");
const path = require('path');
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    
    const user = await userModel.findOne({username});
    if(user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) {
                res.send("505 Server error");
            }
            if(!result) {
                res.send("Password is incorrect");
            }
            else {
                const token = jwt.sign({name: user.name, username: user.username, email: user.email, userid: user._id}, "secretKey");
                res.cookie("token", token);
                res.redirect('/home');
            }
        });
    } else {
        res.send("Username not found");
    }
});

app.post('/register', async (req, res) => {
    const {name, email, username, password} = req.body;
    
    const user = await userModel.findOne({email});
    if(!user) {
        bcrypt.hash(password, 10, async function(err, hash) {
            if(err) {
                res.send("505: Server Error")
                console.log(err);  
            }
            const createdUser = await userModel.create({
                name,
                email, 
                username,
                password: hash
            });

            const token = jwt.sign({name, email, username, userid: createdUser._id}, "secretKey");
            res.cookie("token", token);
            res.redirect('/home')
        });
    } else {
        res.send("Email already exists");
    }
});

app.get('/home', isLoggedIn, async (req, res) => {
    const posts = await postModel.find().populate("user");
    const user = await userModel.findOne({email: req.user.email});
    res.render('home', {posts, user});
});

app.get('/logout', (req, res) => {
    res.cookie('token', "");
    res.redirect('/');
});

app.get('/error', (req, res) => {
    res.render("error");
});

app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile", {user});
});

app.post('/createPost', isLoggedIn, async (req, res) => {
    const {content} = req.body;
    const user = await userModel.findOne({email: req.user.email});
    const post = await postModel.create({
        user: user._id,
        content
    });
    user.posts.push(post);
    user.save();
    res.redirect('/home')
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findOne({_id: req.params.id}).populate("user");
    const user = req.user.userid;
    if(post.likes.indexOf(user) === -1) {
        post.likes.push(user);
    }
    else {
        post.likes.splice(post.likes.indexOf(user), 1);
    }
    await post.save();
    res.redirect('/home');
});

app.get('/likep/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findOne({_id: req.params.id}).populate("user");
    const user = req.user.userid;
    if(post.likes.indexOf(user) === -1) {
        post.likes.push(user);
    }
    else {
        post.likes.splice(post.likes.indexOf(user), 1);
    }
    await post.save();
    res.redirect('/profile');
});

app.get('/editPost/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findById(req.params.id);
    res.render("edit",{post});
});

app.post('/updatePost/:id', isLoggedIn, async (req, res) => {
    await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content});
    res.redirect('/profile');
});

app.get('/delete/:id',isLoggedIn,async (req, res)=>{
    await postModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/profile');
})

function isLoggedIn(req, res, next) {
    if(req.cookies.token === "") {
        res.redirect("/error");
    }
    else {
        const data = jwt.verify(req.cookies.token, "secretKey");
        req.user = data;
        next();
    }
}

app.listen(3000);