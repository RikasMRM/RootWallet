import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Expense {
  _id: string;
  title: string;
  description?: string;
  date: Date;
  category: string;
  amount: number;
}

interface ExpensesState {
  value: Expense[];
  filter: string;
  editingExpense: Expense | null;
}

const initialState: ExpensesState = {
  value: [],
  filter: "All",
  editingExpense: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.value = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.value.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.value.findIndex(
        (expense) => expense._id === action.payload._id
      );
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
      }
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (expense) => expense._id !== action.payload
      );
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    startEditing: (state, action: PayloadAction<string>) => {
      const expense = state.value.find(
        (expense) => expense._id === action.payload
      );
      state.editingExpense = expense || null;
    },
    stopEditing: (state) => {
      state.editingExpense = null;
    },
  },
});

export const {
  getExpenses,
  addExpense,
  updateExpense,
  removeExpense,
  setFilter,
  startEditing,
  stopEditing,
} = expenseSlice.actions;

export const selectExpenses = (state: RootState) => state.expense.value;

// Filter expenses
export const selectFilteredExpenses = (state: RootState) =>
  state.expense.filter === "All"
    ? state.expense.value
    : state.expense.value.filter(
        (expense) => expense.category === state.expense.filter
      );

export const selectEditingExpense = (state: RootState) =>
  state.expense.editingExpense;

export default expenseSlice.reducer;
