const { User, Account } = require("../db")
const express=require("express")
const { authMiddleware } = require("../middleware")

const router = express.Router()


router.get("/balance",authMiddleware, async (req, res) => {
    
    const userid = req.body.userid
    const account = await Account.findOne({userid:userid})
    res.status(200).json({balance:account.balance})
    
})

module.exports=router