import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    category: {
      type: String,
      enum: [
        "Food",
        "Household",
        "SocialLife",
        "Transportation",
        "Health",
        "Miscellaneous",
      ],
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;
