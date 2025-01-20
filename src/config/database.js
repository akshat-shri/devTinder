const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://AkshatNode:2gJwmivmH2Jkh1vF@node.q6sij.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
