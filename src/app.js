const express = require("express");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

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
  try {
    //validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User created");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending a connection request");

  res.send(user.firstName + "sent the connection request");
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
    if (data?.skills.length > 10) {
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
