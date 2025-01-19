const express = require("express");
const {adminAuth, userAuth} = require("./middlewares/auth")

const app = express();

app.use("/admin",adminAuth);

app.use("/user",userAuth,(req,res)=>{
    res.send("user authorized");
});

app.get("/admin/getAllData",(req,res)=>{
        res.send("yup get it");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("user deleted");
})

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
