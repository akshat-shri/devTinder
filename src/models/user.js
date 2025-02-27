const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid Email"+ value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("invalid Email"+ value);
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "this is a default of user!",
    },
    skills: {
      type: [String],
    },
    photourl: {
      type: String,
      default:
        "https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
