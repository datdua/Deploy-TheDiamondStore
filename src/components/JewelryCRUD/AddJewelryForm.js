import React, { useState } from "react";
import { createJewelry } from "../../api/JewelryAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function AddJewelryForm() {
  const [jewelry, setJewelry] = useState({
    jewelryID: "",
    jewelryName: "",
    gender: "",
    jewelryImage: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");

  const labels = {
    jewelryID: "Mã trang sức",
    jewelryName: "Tên trang sức",
    gender: "Giới tính",
    jewelryImage: "Hình ảnh trang sức",
    quantity: "Số lượng",
  };

  const options = {
    gender: ["Nam", "Nữ"],
  };

  const handleChange = (event) => {
    setJewelry({ ...jewelry, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createJewelry(jewelry);
      console.log(response);
      setMessage("Tạo mới Trang Sức thành công ");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Trang Sức thất bại");
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
        {Object.keys(jewelry).map((key) => (
          options[key] ? (
            <TextField
              key={key}
              id={`select-${key}`}
              select
              label={labels[key]}
              value={jewelry[key]}
              onChange={handleChange}
              name={key}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
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
              value={jewelry[key]}
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

export default AddJewelryForm;