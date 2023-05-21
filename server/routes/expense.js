import express from "express";

const router = express.Router();

import {
  getExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.js";

//** Get all expenses
router.get("/expenses", getExpenses);

//** Create a new expense
router.post("/expenses", createExpense);

//** Get a specific expense
router.get("/expenses/:id", getExpense);

//** Update a specific expense
router.put("/expenses/:id", updateExpense);

//** Delete a specific expense
router.delete("/expenses/:id", deleteExpense);

export default router;
