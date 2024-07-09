import React, { useState } from "react";
import { createDiamondPrice } from "../../api/DiamondPriceAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function AddDiamondPriceForm() {
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

  const options = {
    caratSize: [3.6, 3.9, 4.1, 4.5],
    color: ["F", "E", "J", "D"],
    clarity: ["VS1", "VS2", "VVS1", "VVS2"],
  };

  const handleChange = (event) => {
    setDiamondPrice({ ...diamondPrice, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createDiamondPrice(diamondPrice);
      if (response.status === 200) {
        console.log(response);
        setMessage("Tạo mới Giá Kim Cương thành công");
      } else {
        // Handle non-200 responses, assuming the API returns a meaningful message
        console.error(response);
        const errorMessage = response.data?.message || "Có lỗi xảy ra khi tạo mới Giá Kim Cương";
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
      // Handle network errors or other issues not caught by response status
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
              type="text"
            />
          )
        ))}
        <Button type="submit" variant="contained" color="success">Thêm giá</Button>
        {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
      </Box>
    </div>
  );
}

export default AddDiamondPriceForm;