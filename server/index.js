import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//** Import routes
import expensesRouter from './routes/expense.js';

const app = express();

dotenv.config();

//** Add middleware for parsing the body to req.body and cors
app.use(express.json());
app.use(cors());

//** Use the expenses router for all expenses routes
app.use('/api/expenses', expensesRouter);

//** Connect to MongoDB
const PORT = process.env.PORT || 6001;
const MONGO_URL =
  'mongodb+srv://rikasrkf:rikas@cluster0.thypy2h.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} not connected`));
