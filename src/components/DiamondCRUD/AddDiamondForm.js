import React, { useState } from "react";
import { createDiamond } from "../../api/DiamondAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


function AddDiamondForm() {
  const [diamond, setDiamond] = useState({
    diamondID: "",
    diamondName: "",
    diamondImage: "",
    caratSize: "",
    color: "",
    cut: "Excellent",
    clarity: "",
    shape: "",
    origin: "GIA",
  });


  const [message, setMessage] = useState("");


  const labels = {
    diamondID: "Mã số",
    diamondName: "Tên kim cương",
    diamondImage: "Hình ảnh",
    caratSize: "Kích thước carat",
    color: "Màu sắc",
    cut: "Vết cắt",
    clarity: "Độ tinh khiết",
    shape: "Hình dạng",
    origin: "Xuất xứ",
  };


  const options = {
    color: ["F", "E", "J", "D"],
    clarity: ["VS1", "VS2", "VVS1", "VVS2"],
    shape: ["Round", "Pear", "Radiant"],
  };


  const handleChange = (event) => {
    setDiamond({ ...diamond, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createDiamond(diamond);
      console.log(response);
      setMessage(response.message || "Tạo mới Kim Cương thành công");
    } catch (error) {
      let errorMessage = "Tạo mới Kim Cương thất bại";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setMessage(errorMessage);
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
        {Object.keys(diamond).map((key) => (
          options[key] ? (
            <TextField
              key={key}
              id={`select-${key}`}
              select
              label={labels[key]}
              value={diamond[key]}
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
          ) : key === "cut" ? (
            <TextField
              key={key}
              id="outlined-read-only-input"
              label={labels[key]}
              defaultValue="Excellent"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          ) : key === "origin" ? (
            <TextField
              key={key}
              id="outlined-read-only-input"
              label={labels[key]}
              defaultValue="GIA"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          ): (
            <TextField
              key={key}
              id="outlined-basic"
              label={labels[key]}
              variant="outlined"
              name={key}
              value={diamond[key]}
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