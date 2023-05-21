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
  CircularProgress,
} from "@mui/material";
import CategoryComponent from "../components/Category";
import axios from "axios";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  padding: "15px",
};

interface IExpenseResponseDto {
  _id: string;
  __v: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  title: string;
}

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const [expenses, setExpenses] = React.useState<IExpenseResponseDto[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:6001/api/expenses/${id}`);
      setExpenses((expenses) =>
        expenses?.filter((expense) => expense._id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the expense.");
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:6001/api/expenses")
      .then((response) => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while fetching expenses.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: 2 }}
            >
              Create New Expense
            </Typography>
            <ExpenseForm />
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
                <Button size="small">Edit</Button>
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
