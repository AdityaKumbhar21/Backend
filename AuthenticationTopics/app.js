import express from 'express';
const app = express();

// encrypting a pass using bcrypt
import bcrypt from 'bcrypt';


// cookie parser for reading the cookie
import cookieParser from 'cookie-parser';

app.use(cookieParser());


// using jwt to set the cookie
import jwt from 'jsonwebtoken';

// setting a cookie
app.get('/',(req, res)=>{
    // setting a cookie with key value pair as name: Aditya
    res.cookie("name","Aditya");
    res.send("done setting cookie")
});


// checking if cookie is along all the routes
app.get('/random',(req, res)=>{
    // reading the cookie
    console.log(req.cookies);
    
    res.send("This is random route")
});


// encrypting the pass
app.get('/encryptPass',(req, res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        // salt here will gen a random seq of chars
        bcrypt.hash("password", salt, function(err, hash) {
            console.log(hash); // encrypted password
        });
    });
    res.send("Password Encrypted");
});

//$2b$10$vh9Zx3AKdFLVxfh.agDcj.0FuYFkmNIBK/hoeFJxxii7IwQ4I7Cj2
// comparing the encrypted pass with the org one
app.get('/checkPass',(req, res)=>{
    bcrypt.compare("password", "$2b$10$vh9Zx3AKdFLVxfh.agDcj.0FuYFkmNIBK/hoeFJxxii7IwQ4I7Cj2", function(err, result) {
        if(result){
            res.send("Password correct");
        }
        else{
            res.send("Password Incorrect");
        }
    });
});


// setting a cookie using jwt
app.get('/jwtDemo',(req, res)=>{
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({email: "Aditya@example.com"},"secret");
    // setting the token as a cookie
    res.cookie("token",token);
    console.log(token);
    res.send("JWT DEMO");
});


// reading the data in the cookie using jwt
app.get('/readToken',(req, res)=>{
    // if the secretKey matches then only the data is accessable
    const data = jwt.verify(req.cookies.token, "secret");
    console.log(data.email);
    res.send("Reading cookie in log");
})

app.listen(3000);