import express from 'express';
// importing the created model
import user from './userModel.js';
import userModel from './userModel.js';


const app = express();


app.get('/',(req, res)=>{
    res.send("Hello");
});


// creating user
app.get('/create',async (req, res)=>{
    const data = await user.create({
        name:"Aditi",
        email: "aditi@gmail.com",
        username: "aditi1288"
    });

    res.send(data)
})

// updating a user
app.get('/update',async(req, res)=>{
    // findOneAndUpdate(findOne, Update, options) -> findOne== The one with which you have to find -> update== what you have to update -> new:true == update and will return a new document.
    const updatedUser = await userModel.findOneAndUpdate({username:"adi1288"},{name: "Aditya Kumbhar"},{new:true});
    res.send(updatedUser);
});

// reading all users
app.get('/readAll',async (req, res)=>{
    const users = await userModel.find();
    res.send(users);
});

// reading a specific user with a username
app.get('/readUser',async (req, res)=>{
   // const user = await userModel.find({username: "adi1288"}); //this will return an array
    const user = await userModel.findOne({username: "aditi1288"}); // this will return the first object found
    res.send(user);
})


// Deleting a user
app.get('/deleteUser',async (req, res)=>{
    const deltedUser = await userModel.findOneAndDelete({username: "aditi1288"});
    res.send(deltedUser);
});

app.listen(3000)