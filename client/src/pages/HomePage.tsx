import React from "react";
import ExpenseForm from "../components/ExpenseForm/index";
import { Modal, Button, Box, Typography } from "@mui/material";
import CategoryComponent from "../components/Category";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  padding: "15px",
};

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    </>
  );
};

export default HomePage;
