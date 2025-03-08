const express = require('express');
const app = express();
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');


app.set('view engine','ejs');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, buff)=>{
            const fn = buff.toString('hex') + path.extname(file.originalname);
            cb(null, fn);
        });
    }
  })
  
  const upload = multer({ storage: storage })

app.get('/',(req, res)=>{
    res.render("index");
});


app.post('/upload',upload.single('image'),(req, res)=>{
    console.log(req.file); 
    res.redirect('/') 
});

app.listen(3000);