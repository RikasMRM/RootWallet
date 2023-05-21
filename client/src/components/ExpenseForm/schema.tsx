import * as yup from "yup";

const expenseFormValidationSchema = yup.object().shape({
  title: yup.string().trim().required("Please enter a title"),
  description: yup.string().trim().required("Please enter a description"),
  category: yup.string().required("Please enter a category"),
  amount: yup.number().min(1).required("Please enter a amount"),
});

export default expenseFormValidationSchema;
