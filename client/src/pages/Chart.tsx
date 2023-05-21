import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import axios from "axios";
import { IExpenseResponseDto } from "./HomePage";

interface IChartData {
  category: string;
  amount: number;
}

const Chart = () => {
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:6001/api/expenses");
        const expenses = response.data;
        const currentMonthExpenses = expenses.filter(
          (expense: IExpenseResponseDto) => {
            const expenseMonth = moment(expense.createdAt).format("MM");
            const currentMonth = moment().format("MM");
            return expenseMonth === currentMonth;
          }
        );
        const categoryMap: { [key: string]: number } = {};

        currentMonthExpenses.forEach((expense: IExpenseResponseDto) => {
          const { category, amount } = expense;
          if (categoryMap[category]) {
            categoryMap[category] += amount;
          } else {
            categoryMap[category] = amount;
          }
        });

        const chartData = Object.keys(categoryMap).map((category) => ({
          category,
          amount: categoryMap[category],
        }));

        setChartData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
