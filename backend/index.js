const express = require("express");
const rootRouter = require("./routes/index")
const port=3000
const cors=require("cors")
const app = express()
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://BAIGUN:abhashukla27@cluster0.k38rm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url).then(()=>console.log("Mongoose DB connection successful"))




app.use(express.json())
app.use(cors())

app.use("/api/v1", rootRouter)


app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
