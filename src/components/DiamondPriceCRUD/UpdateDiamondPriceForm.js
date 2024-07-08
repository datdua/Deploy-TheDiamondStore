import React, { useState } from "react";
import { updateDiamondPrice } from "../../api/DiamondPriceAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function UpdateDiamondPriceForm({ diamondPrice }) {
  const [updatedDiamondPrice, setUpdateDiamondPrice] = useState(diamondPrice);

  const labels = {
    diamondEntryPrice: "Giá Kim Cương",
    clarity: "Độ trong",
    color: "Màu sắc",
    caratSize: "Trọng lượng",
  };

  const handleChange = (event) => {
    setUpdateDiamondPrice({
      ...updatedDiamondPrice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDiamondPrice(
        diamondPrice.diamondPriceID,
        updatedDiamondPrice
      );
      alert("Cập nhật thông tin Giá Kim Cương thành công");
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data.message === "Giá kim cương này đã tồn tại"
      ) {
        alert("Giá kim cương này đã tồn tại");
      }
      alert("Cập nhật thông tin Giá Kim Cương thất bại");
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {Object.keys(labels).map((key) => (
          <TextField
            key={key}
            id="outlined-basic"
            label={labels[key]}
            variant="outlined"
            name={key}
            value={updatedDiamondPrice[key]}
            onChange={handleChange}
            type="text"
          />
        ))}
        <Button type="submit" variant="contained" color="success">Cập nhật</Button>
      </Box>
    </div>
  );
}
export default UpdateDiamondPriceForm;