import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import expenseFormValidationSchema from "./schema";

interface IExpenseForm {
  title: string;
  description: string;
  date: string;
  category: string;
  amount: number;
}

const categories = [
  {
    text: "Food",
    value: "Food",
  },
  {
    text: "Social Life",
    value: "SocialLife",
  },
  {
    text: "Transportation",
    value: "Transportation",
  },
  {
    text: "Health",
    value: "Health",
  },
  {
    text: "Miscellaneous",
    value: "Miscellaneous",
  },
];

const ExpenseForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<IExpenseForm>({
    mode: "all",
    resolver: yupResolver(expenseFormValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      category: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: IExpenseForm) => {
    try {
      await axios.post("http://localhost:6001/api/expenses", data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={4} rowGap={4}>
        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ mb: 2 }}>Title</FormLabel>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  placeholder="Enter Title"
                  size={"small"}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ mb: 2 }}>Description</FormLabel>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  placeholder="Enter Description"
                  size={"small"}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ mb: 2 }}>Category</FormLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  sx={{
                    display: { xs: "none", md: "flex" },
                    minWidth: "215px",
                  }}
                  size="small"
                  renderValue={(selected: any) => (
                    <>
                      <Typography component="span">
                        {categories.find((x) => x.value === selected)?.text}
                      </Typography>
                    </>
                  )}
                  {...field}
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category.value}>
                      {category.text}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ mb: 2 }}>Date</FormLabel>
            <DatePicker onChange={(e) => setValue("date", e as string)} />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ mb: 2 }}>Amount</FormLabel>
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  placeholder="Enter Description"
                  size={"small"}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size={"medium"}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress /> : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpenseForm;
