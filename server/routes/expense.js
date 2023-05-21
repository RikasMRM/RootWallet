import express from 'express';

const router = express.Router();

import {
  getExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expense.js';

//** Get all expenses
router.get('/', getExpenses);

//** Create a new expense
router.post('/', createExpense);

//** Get a specific expense
router.get('/:id', getExpense);

//** Update a specific expense
router.put('/:id', updateExpense);

//** Delete a specific expense
router.delete('/:id', deleteExpense);

export default router;
