import { Router } from "express";
import { addTransaction, deleteTransaction, fetchTransactions } from "../controllers/transaction.controller.js";

const router = Router()

router.route("/all/transactions").get(fetchTransactions)
router.route("/add/transaction").post(addTransaction)
router.route("/delete/transaction/:id").delete(deleteTransaction)

export default router