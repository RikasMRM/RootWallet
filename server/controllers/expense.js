import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};

export const createExpense = async (req, res) => {
  const newExpense = new Expense(req.body);
  const savedExpense = await newExpense.save();
  res.json(savedExpense);
};

export const getExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  res.json(expense);
};

export const updateExpense = async (req, res) => {
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedExpense);
};

export const deleteExpense = async (req, res) => {
  const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
  res.json(deletedExpense);
};
