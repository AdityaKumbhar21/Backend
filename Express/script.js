const express = require('express');
const app = express();


// MiddleWare
app.use((req, res, next)=>{
    console.log("Middleware ");
    next();
});


app.get("/",(req, res)=>{
    res.send("Hello World 111ssd");
});

app.get("/my",(req, res)=>{
    res.send("This is my");
});




app.listen(3000);