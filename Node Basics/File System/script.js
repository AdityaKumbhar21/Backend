const fs = require('fs');


// File System

// Write file
fs.writeFile("hello.txt", "This is the demo data of wf", (err)=>{
    if(err) console.log(err);
    else console.log("Done writing");
});

// Append File
fs.appendFile("hello.txt", "\nthis is appended data",(err)=>{
    if(err) console.log(err);
    else console.log("Done appending");
});

// Read file
fs.readFile("hello.txt",'utf8', (err, data)=>{
    if(err) console.log(err);
    else console.log(data); 
});

// Copying a file
fs.copyFile("hello.txt","./copyFolder/copy.txt",(err)=>{
    if(err) console.log(err);
    else console.log("Done Copying");
});

// Deleting a file
/*fs.unlink("./copyFolder/copy.txt",(err)=>{
    if(err) console.log(err);
    else console.log("Successfully Deleted");
});*/

// Deleting a directory
/*fs.rm("./copyFolder",{recursive:true, force:true},(err)=>{
    if(err) console.log(err);
    else console.log("Deleted Directory");
});*/


fs.readdir("./demoDir",'utf-8',(err, data)=>{
    if(err) console.log(err);
    else console.log(data);
    
});
