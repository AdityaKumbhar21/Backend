import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import userModel from "./models/user.js";
import postModel from "./models/post.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jwt = jsonwebtoken;


const app = express();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + "public")));
app.use(cookieParser());


app.get('/',(req, res)=>{
    res.render("index");
});


app.get('/login',(req, res)=>{
    res.render('login')
});

app.post('/login',async (req, res)=>{
    const {username, password} = req.body;
    
    const user = await userModel.findOne({username});
    if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                res.send("505 Server error");
            }
            if(!result){
                res.send("Password is incorrect");
            }
            else{
                const token = jwt.sign({name:user.name, username: user.username, email:user.email, userid:user._id}, "secretKey");
                res.cookie("token", token);
                res.redirect('/home');
            }
        });
    }
    
});

app.post('/register',async (req, res)=>{
    const {name, email, username, password} = req.body;
    
    const user = await userModel.findOne({email});
    if(!user){
        bcrypt.hash(password, 10,async  function(err, hash) {
            if(err){
                res.send("505: Server Error")
                console.log(err);  
            }
            const createdUser =  await userModel.create({
                name,
                email, 
                username,
                password: hash
            });

            const token = jwt.sign({name, email,username,userid: createdUser._id},"secretKey");
            res.cookie("token", token);
            res.redirect('/home')
        });
    }
    
});

app.get('/home',isLoggedIn,(req, res)=>{
    res.render('home');
});

app.get('/logout',(req, res)=>{
    res.cookie('token',"");
    res.redirect('/');
});

app.get('/error', (req, res)=>{
    res.render("error");
})


function isLoggedIn(req, res, next){
    if(req.cookies.token === ""){
        res.redirect("/error");
    }
    else{
        const data = jwt.verify(req.cookies.token , "secretKey");
        console.log(data);
        next();
    }
}

app.listen(3000);