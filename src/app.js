const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created");
  } catch (err) {
    res.status(400).send("error in creating user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(2000, () => {
      console.log("Server is running on port 2000");
    });
  })
  .catch((err) => {
    console.log("error in connecting database");
  });
