const express = require("express");

const app = express();

// app.use("/h",(req,res) => {                  //Request handler
//     res.send("Hello developer!  ");
// });

// app.use("/test1",(req,res) => {                 //Request handler
//     res.send("Akshat Shrivastava!");
// });

// app.use("/user",(req,res) => {                  //Request handler
//     res.send("Hello from Akshat Shrivastava!");
// });

app.get("/user",(req,res)=>{
    res.send({Firstname:"Akshat", Lastname:"Shrivastava"}); 
});

app.post("/user",(req,res)=>{
    // data save in databse
    res.send("Data successully saved to database");
});

app.delete("/user",(req,res)=>{
    res.send("data successfully deleted");
});

app.patch("/user",(req,res)=>{
    res.send("data successfully updated");
});

app.put("/user",(req,res)=>{
    res.send("data successfully replaced");
});

app.listen(2000,()=>{
    console.log("Server is running on port 2000");                                                                  
});