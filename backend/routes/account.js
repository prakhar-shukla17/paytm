const { User, Account } = require("../db");
const express = require("express");
const { authMiddleware } = require("../middleware");
const mongoose=require("mongoose")
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const userid = req.userid;
    
    const account = await Account.findOne({ userid: userid });
    // console.log(account._id)
  res.status(200).json({ balance: account.balance });
});





router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;
  const account = await Account.findOne({ userid: req.userid });
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Insufficient balance",
    });
  }
  const toaccount = await Account.findOne({
    userid: to,
  }).session(session);
  if (!toaccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid account",
    });
    }
    

  await Account.updateOne(
    { userid: req.userid },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    {
      userid: to,
    },
    { $inc: { balance: amount } }
    ).session(session);
    
    await session.commitTransaction();
    res.json({ msg: "Transfer Succesful" })
});

module.exports = router;