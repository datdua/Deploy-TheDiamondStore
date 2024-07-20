import React, { useState } from "react";
import { createDiamondPrice } from "../../api/DiamondPriceAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function AddDiamondForm() {
  const [diamondPrice, setDiamondPrice] = useState({
    clarity: "",
    color: "",
    caratSize: "",
    diamondEntryPrice: ""
  });

  const [message, setMessage] = useState("");

  const labels = {
    clarity: "Độ tinh khiết",
    color: "Màu sắc",
    caratSize: "Kích thước carat",
    diamondEntryPrice: "Giá nhập"
  };

  const options = {
    color: ["F", "E", "J", "D"],
    clarity: ["VS1", "VS2", "VVS1", "VVS2"]
  };

  const handleChange = (event) => {
    setDiamondPrice({ ...diamondPrice, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createDiamondPrice(diamondPrice);
      console.log(response);
      setMessage(response.message || "Tạo mới giá kim cương thành công");
    } catch (error) {
      let errorMessage = "Tạo mới giá kim cương thất bại";
      if (error.message) {
        errorMessage = error.message;
      }
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {Object.keys(diamondPrice).map((key) => (
          options[key] ? (
            <TextField
              key={key}
              id={`select-${key}`}
              select
              label={labels[key]}
              value={diamondPrice[key]}
              onChange={handleChange}
              name={key}
              variant="outlined"
              InputLabelProps={{ shrink: true, }}
            >
              {options[key].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              key={key}
              id="outlined-basic"
              label={labels[key]}
              variant="outlined"
              name={key}
              value={diamondPrice[key]}
              onChange={handleChange}
            />
          )
        ))}
        <Button type="submit" variant="contained" color="success">Hoàn thành</Button>
        {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
      </Box>
    </div>
  );
}

export default AddDiamondForm;
