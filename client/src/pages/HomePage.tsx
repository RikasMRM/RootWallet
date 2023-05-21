import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm/index";
import {
  Modal,
  Button,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import CategoryComponent from "../components/Category";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "../services/expenseSlice";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  padding: "15px",
};

export interface IExpenseResponseDto {
  _id: string;
  __v: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  title: string;
  category: string;
}

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState<IExpenseResponseDto[]>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(expenseActions.stopEditing());
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      (async () => {
        try {
          const response = await axios.get(
            "http://localhost:6001/api/expenses"
          );
          setExpenses(response.data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [open]);

  const editExpense = (expense: IExpenseResponseDto) => {
    setOpen(true);
    dispatch(expenseActions.startEditing(expense));
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:6001/api/expenses/${id}`);
      setExpenses((expenses) =>
        expenses?.filter((expense) => expense._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ margin: 5 }}
      >
        <CategoryComponent />
        <Button onClick={handleOpen}>Create New Expense</Button>
        <Modal
          sx={{ backgroundColor: "white" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ExpenseForm handleClose={handleClose} />
          </Box>
        </Modal>
      </Box>
      <Grid container spacing={2} sx={{ padding: 5 }}>
        {expenses?.map((expense) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {expense.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {expense.description}
                </Typography>
                <Typography variant="body2">
                  {expense.amount}
                  <br />
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button size="small" onClick={() => editExpense(expense)}>
                  Edit
                </Button>
                <Button size="small" onClick={() => handleDelete(expense._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
