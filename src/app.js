const express = require("express");

const app = express();

app.get(
  "/user",
  
  (req, res, next) => {
    console.log("handle first route");
    next();
    // res.send("response");
  },
  (req, res, next) => {
    console.log("handle second route");
    // res.send("2nd response");
    next();
  },
  (req, res,next) => {
    console.log("handle third route")
    // res.send("3rd response");
    next();
  },
  (req, res, next) => {
    console.log("handle forth route");
    // res.send("4th response");
  }

);

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
