import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    }
})


export const Transaction = mongoose.model("Transaction", transactionSchema)