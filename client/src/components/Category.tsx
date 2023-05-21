import { Select, Typography, MenuItem } from "@mui/material";
import React from "react";
import { categories } from "../data/categories";

const CategoryComponent: React.FC<{
  selectedCategory: (val: string) => void;
}> = ({ selectedCategory }) => {
  const newCategory = [{ text: "Select a Category", value: "all" }].concat(
    categories
  );

  return (
    <Select
      sx={{
        display: { xs: "none", md: "flex" },
        minWidth: "215px",
      }}
      defaultValue={"all"}
      size="small"
      onChange={(e) => selectedCategory(e.target.value)}
      renderValue={(selected: any) => (
        <>
          <Typography component="span">
            {newCategory.find((x) => x.value === selected)?.text}
          </Typography>
        </>
      )}
    >
      {newCategory.map((category, index) => (
        <MenuItem key={index} value={category.value}>
          {category.text}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CategoryComponent;
