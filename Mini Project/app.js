import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import userModel from "./models/user.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



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

app.post('/register',async (req, res)=>{
    const {name, email, username, password} = req.body;
    
    const user = await userModel.findOne({email});
    if(!user){
        bcrypt.hash(password, 10,async  function(err, hash) {
            if(err){
                console.log(err);
                
            }
            const createdUser =  await userModel.create({
                name,
                email, 
                username,
                password: hash
            });
            res.redirect('/')
        });
    }
    
})


app.listen(3000);