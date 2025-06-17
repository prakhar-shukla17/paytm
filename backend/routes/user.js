const express = require("express");
const app = express();
const zo = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const singupbody = zo.object({
  username: zo.string().email(),
  firstName: zo.string(),
  lastName: zo.string(),
  password: zo.string(),
});

router.post("/signup", async (req, res) => {
  const {success} = singupbody.safeParse(req.body);
  if (!success) {
    console.log("Email already taken/wrong input");
    return res.status(411).json({
      msg: "Email already taken/wrong input",
    });
  }
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    console.log("User already exists");
    return res.status(411).json({
      msg: "User already exists",
    });
  }
  const newUser = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });
  const userid = newUser._id;

    const token = jwt.sign({ userid, }, JWT_SECRET);
    res.json({
        msg: `User was Created`,
        token:token
    })
    
});


router.post("/signin", async (req, res) => {
  const signinbody = zo.object({
    username: zo.string().email(),
    password: zo.string()
  })
  const { success } = signinbody.safeParse(req.body)
  if (!success) {
    console.log("Email already taken/wrong input");
    return res.status(411).json({
      msg: "Email already taken/wrong input",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password:req.body.password
  })
  if (!user)
  {
    console.log("wrong email or password")
    res.status(411).json({
      msg:"wrong email or password"
    })
  }
  const token = jwt.sign({ userid: user._id }, JWT_SECRET)
  res.status(200).json({
    msg: "User signed in",
    token:token
  })


});

module.exports = router;
