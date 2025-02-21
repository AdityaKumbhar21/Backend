import express from "express";
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';


const jwt = jsonwebtoken;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + "public")));
app.use(cookieParser());



app.get('/',(req, res)=>{
    res.render("index");
});


app.get('/signIn',(req, res)=>{
    res.render('signIn');
});

app.post('/signIn',async (req, res)=>{
    const user = await  User.findOne({email: req.body.email});

    if(!user) res.send("Email or Password is incorrect");
    else{
        bcrypt.compare(req.body.password, user.password,(err, result)=>{

            if(!result) res.send("Password is incorrect");
            else{
                //setting the cookie to keep the user logged in.
                const token = jwt.sign({email:user.email},"secretkey");
                res.cookie("token",token);
                res.redirect("home");
            }
        });
    }
})

// creating a user
app.post('/create',(req, res)=>{
   const {name, email, password} = req.body;
   bcrypt.hash(password, 10,async  function(err, hash) {
        const createdUser = await User.create({
                name,
                email,
                password:hash
            });
            ////setting the cookie to keep the user logged in.
            // setting a cookie using jwt 
            const token = jwt.sign({email},"secretkey");
            res.cookie("token",token);
            res.redirect("home");
    });
   
});


app.get('/home',(req, res)=>{
    res.render('home');
})

// logging out 
app.get('/logout',(req, res)=>{
    res.cookie('token',"");
    res.redirect('/');
});


app.listen(3000);