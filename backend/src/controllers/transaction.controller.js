import { Transaction } from "../models/transaction.model.js"



const fetchTransactions = async (req, res) => {
    try {
        const allTransactions = await Transaction.find()
        res.send(allTransactions)
    } catch (error) {
        console.error('Error fetching transactions:', error)
        return res.status(500).json({ error: "An error occurred while fetching transactions" })
    }
}

const addTransaction = async (req, res) => {
    try {
        const {amount, description, dateTime} = req.body

        if(!amount || !description || !dateTime){
            return res.status(400).json({ error: "Enter details correctly" })
        }

        const transaction = await Transaction.create({description, dateTime, amount})
        res.status(201).json({transaction, message: "Transaction added"})
    } catch (error) {
        console.error('Error while adding transaction:', error)
        res.status(500).json({ error: "An error occurred while adding transaction" })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const  {id}  = req.params

        if(!id){
            return res.status(400).json({ error: "id is not defined" })
        }

        const transaction = await Transaction.findById(id)
        if(!transaction){
            return res.status(404).send("Transaction not found")
        }

        await Transaction.findByIdAndDelete(id)
        res.status(200).json({message: "Transaction deleted"})
    } catch (error) {
        console.error('Error while deleting transaction:', error)
        return res.status(500).json({ error: "An error occurred while deleting transaction" })
    }
}


export {
    fetchTransactions,
    addTransaction,
    deleteTransaction
}
