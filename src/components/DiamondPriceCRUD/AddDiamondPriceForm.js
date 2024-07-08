import React, { useState } from "react";
import { createDiamondPrice } from "../../api/DiamondPriceAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddCertificateForm() {
  const [diamondPrice, setDiamondPrice] = useState({
    diamondEntryPrice: "",
    clarity: "",
    color: "",
    caratSize: "",
  });

  const [message, setMessage] = useState("");

  const labels = {
    diamondEntryPrice: "Giá Kim Cương",
    clarity: "Độ trong",
    color: "Màu sắc",
    caratSize: "Kích thước",
  };

  const handleChange = (event) => {
    setDiamondPrice({ ...diamondPrice, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createDiamondPrice(diamondPrice);
      console.log(response);
      setMessage("Tạo mới Giá Kim Cương thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Giá Kim Cương thất bại");
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
        {Object.keys(diamondPrice).map((key) => (
          <TextField
            key={key}
            id="outlined-basic"
            label={labels[key]}
            variant="outlined"
            name={key}
            value={diamondPrice[key]}
            onChange={handleChange}
            type="text"
          />
        ))}
        <Button type="submit" variant="contained" color="success">Tạo Giá Kim Cương</Button>
        {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
      </Box>
    </div>
  );
}

export default AddCertificateForm;