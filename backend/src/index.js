import express from 'express'
import connectDB from './db/index.js'
import dotenv from 'dotenv'
import cors from 'cors'
import transactionRouter from './routes/transaction.routes.js'
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use("/api/v1", transactionRouter)

connectDB()
.then( () => {
    app.listen(port, () => {
        console.log(`listen on http://localhost:${port}`)
    })
})