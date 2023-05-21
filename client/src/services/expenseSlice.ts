import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExpenseResponseDto } from "../pages/HomePage";
interface ExpensesState {
  editingExpense: IExpenseResponseDto | null;
}

const initialState: ExpensesState = {
  editingExpense: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    startEditing: (state, action: PayloadAction<IExpenseResponseDto>) => {
      state.editingExpense = action.payload;
    },
    stopEditing: (state) => {
      state.editingExpense = null;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
