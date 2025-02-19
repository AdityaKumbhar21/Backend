const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs');


// setting up middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// setting up view-engine and static files
app.set('view engine','ejs');
app.set(express.static(path.join(__dirname + "public")));

app.get('/',(req, res)=>{
    fs.readdir('./files',(err, files)=>{
        res.render("index",{files:files, note:req.body}); // sending files to frontend
    });
});


app.get('/file/:filename',(req, res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err, data)=>{
        console.log(data);
        res.render('display',{filename:req.params.filename, fileData:data});
    });
});


app.get('/edit/file/:filename',(req, res)=>{
    res.render('edit',{filename:req.params.filename});
})


app.post('/edit/file/:filename',(req, res)=>{
    fs.rename(`./files/${req.params.filename}`,`./files/${req.body.newName}`,(err)=>{
        if(err) console.log(err);
        
        res.redirect('/');
    })
})

app.post('/create',(req, res)=>{
    console.log(req.body);

    fs.writeFile(`files/${req.body['note-title'].split(' ').join('')}.txt`,`${req.body['note-desc']}`,(err)=>{
        console.log('Done writing');
        
        
        res.redirect('/');
    })
    
});


app.listen(3000,()=> console.log("listening on 3000"));