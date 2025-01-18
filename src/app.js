const express = require("express");

const app = express();

app.use("/here",(req,res) => {                  //Request handler
    res.send("Hello!");
});

app.use("/test1",(req,res) => {                 //Request handler
    res.send("Akshat Shrivastava!");
});

app.use("/test",(req,res) => {                  //Request handler
    res.send("Hello from Akshat Shrivastava!");
});

app.listen(2000,()=>{
    console.log("Server is running on port 2000");                                                                  
});