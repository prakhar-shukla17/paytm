const express = require("express");
const app = express();
const zo = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const singupbody = zo.object({
  username: zo.string().email(),
  firstName: zo.string(),
  lastName: zo.string(),
  password: zo.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = singupbody.safeParse(req.body);
  if (!success) {
    console.log("Email already taken/wrong input");
    return res.status(411).json({
      msg: "Email already taken/wrong input",
    });
  }
  console.log(req.body.username)
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
  const newUserbank = await Account.create({
    userid: newUser._id,
    balance:Math.random()*1000
  })
  const userid = newUser._id;

  const token = jwt.sign({ userid }, JWT_SECRET);
  return res.json({
    msg: `User was Created`,
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const signinbody = zo.object({
    username: zo.string().email(),
    password: zo.string(),
  });
  const { success } = signinbody.safeParse(req.body);
  if (!success) {
    console.log("Email already taken/wrong input");
    return res.status(411).json({
      msg: "Email already taken/wrong input",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!user) {
    console.log("wrong email or password");
    return res.status(411).json({
      msg: "wrong email or password",
    });
  }
  const token = jwt.sign({ userid: user._id }, JWT_SECRET);
  return res.status(200).json({
    msg: "User signed in",
    token: token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const updateBody = zo.object({
    password: zo.string().optional(),
    firstName: zo.string().optional(),
    lastName: zo.string().optional(),
  });
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne(
    {
      _id: req.userid,
    },
    { $set: req.body }
  );

  res.json({
    message: "Updated successfully",
  });
});


router.get("/bulk", async (req, res) => {
  const filter = req.query.filter

  try {
    const filteredUsers = await User.find({ $or: [{ firstName: {$regex :filter} }, { lastName:{ $regex:filter }}] }).select("firstName lastName")
    console.log(filteredUsers)
   return  res.status(200).json({
      filteredUsers: filteredUsers
    })
  } catch (err)
  {
    return res.status(400).json(err)
  }
})

module.exports = router;
