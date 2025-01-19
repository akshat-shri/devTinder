const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({Firstname:"Akshat", Lastname:"Shrivastava"}); 
});

app.listen(2000,()=>{
    console.log("Server is running on port 2000");                                                                  
});