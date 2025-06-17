const express = require("express")
const { JWT_SECRET } = require("./config")
const jwt=require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer'))
    {
       return res.status(403).json("error in middleware token")
    }
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log(decoded.userid)
        req.userid = decoded.userid

        next()
    } catch(err) {
          return res.status(403).json("error in middleware")
    }
    
}

module.exports={authMiddleware}