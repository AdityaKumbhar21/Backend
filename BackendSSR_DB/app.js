import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import user from './models/user.js';
import ObjectId from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')))


// Main index page
app.get('/',(req, res)=>{
    res.render("index");
});


// Getting all the users
app.get('/display',async (req, res)=>{
    const users = await user.find();
    res.render('display',{users});
});


// Creating a new user
app.post('/create',async (req, res)=>{
    const {name, email, image} = req.body;
    const createdUser = await user.create({
        name,
        email,
        imageUrl: image
    });
    console.log(createdUser);
    
    res.redirect('/');

});


// getting the user which you have to edit
app.get('/edit/:userId',async (req, res)=>{
    console.log(req.params.userId);
    
    const toEditUser = await user.findOne({_id: req.params.userId});
    res.render("edit",{User:toEditUser});
});

// editing the user.
app.post('/edit/:userId',async (req, res)=>{
    const editedUser = await user.findOneAndUpdate({_id:req.params.userId},{
        name: req.body.name,
        email:req.body.email,
        imageUrl: req.body.image
    },{new:true});
    res.redirect('/display');
});

// deleting the user
app.get('/delete/:userId',async (req,res)=>{
    await user.findOneAndDelete({_id:req.params.userId});
    res.redirect('/display');
});



app.listen(3000);