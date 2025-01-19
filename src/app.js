const express = require("express");


const app = express();

// app.use("/",(err,req,res,next)=>{
//     if(err){
//     res.status(500).send("something went wrong");
// }
// });

app.get("/user",(req,res)=>{
    try{
    throw new error("ajsh");
    res.send("user authorized");
    } catch(err){
        res.status(500).send("something wrong");
    }
});

app.use("/",(err,req,res,next)=>{
    if(err){
    res.status(500).send("something went wrong");
}
});

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
