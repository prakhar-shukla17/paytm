const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName:String
})

const User = mongoose.model('User', userSchema)


const accountSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    balance: {
        type: Number,
        required:true
    }
})

const Account = mongoose.model("Account", accountSchema)

module.exports = { User,Account }


// const transferFunds = async (fromAccountId, toAccountId, amount) => {
//     // Decrement the balance of the fromAccount
// 	  await Account.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } });

//     // Increment the balance of the toAccount
//     await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
// }

// // Example usage
// transferFunds('fromAccountID', 'toAccountID', 100);