const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// app.get("/user", async (req, res) => {
//     const userId = req.body.Id;
//     try {
//       const users = await User.findById(userId);
//       if(!users){
//           res.status(404).send("user not found");
//       }
//       else {
//           res.send(users);
//       }
//     } catch (err) {
//       res.status(400).send("something went wrong");
//     }
//   });

// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//       const users = await User.findOne({ emailId: userEmail });
//       if(!users){
//           res.status(404).send("user not found");
//       }
//       else {
//           res.send(users);
//       }
//     } catch (err) {
//       res.status(400).send("something went wrong");
//     }
//   });

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if(users.length === 0){
//         res.status(404).send("user not found");
//     }
//     else {
//         res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("no user found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created");
  } catch (err) {
    res.status(400).send("error in creating user:" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.Id;
  try {
    const users = await User.findByIdAndDelete(userId);
    res.send("user deleted");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_UPDATES = ["age", "gender", "about", "skills", "photourl"];

    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }
    if(data?.skills.length>10){
      throw new Error("skills should be less than 10");
    }
    await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated");
  } catch (err) {
    res.status(400).send("Update Failed" + err.message);
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
