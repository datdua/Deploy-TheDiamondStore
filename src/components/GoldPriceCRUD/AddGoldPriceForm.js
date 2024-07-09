import React, { useState } from "react";
import { createGoldPrice } from "../../api/GoldPriceAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function AddGoldPriceForm() {
  const [goldPrice, setGoldPrice] = useState({
    jewelryID: "",
    goldPrice: "",
    goldAge: "",
  });

  const [message, setMessage] = useState("");

  const labels = {
    jewelryID: "Mã trang sức",
    goldPrice: "Giá vàng",
    goldAge: "Tuổi vàng",
  };

  const options = {
    goldAge: [22, 18, 14, 10],
  };

  const handleChange = (event) => {
    setGoldPrice({ ...goldPrice, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createGoldPrice(goldPrice);
      console.log(response);
      setMessage("Tạo mới Giá Vàng thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Giá Vàng thất bại");
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
        {Object.keys(goldPrice).map((key) => (
          options[key] ? (
            <TextField
              key={key}
              id={`select-${key}`}
              select
              label={labels[key]}
              value={goldPrice[key]}
              onChange={handleChange}
              name={key}
              variant="outlined"
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
              value={goldPrice[key]}
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

export default AddGoldPriceForm;