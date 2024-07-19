import React, { useState } from "react";
import { createWarranty } from "../../api/WarrantyAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AddWarrantyDiamondForm() {
  const [warranty, setWarranty] = useState({
    warrantyID: "",
    diamondID: "",
    expirationDate: "",
    expirationTime: "",
    warrantyImage: "",
  });

  const [message, setMessage] = useState("");

  const labels = {
    warrantyID: "Mã giấy bảo hành",
    diamondID: "Mã kim cương",
    expirationDate: "Ngày hết hạn",
    expirationTime: "Giờ hết hạn",
    warrantyImage: "Giấy bảo hành",
  };

  const handleChange = (event) => {
    setWarranty({ ...warranty, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimeWarranty = {
        ...warranty,
        expirationDate: `${warranty.expirationDate} ${warranty.expirationTime}:00`,
      };
      const response = await createWarranty(dateTimeWarranty);
      console.log(response);
      setMessage("Tạo mới Giấy Bảo Hành thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Giấy Bảo Hành thất bại");
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
        {Object.keys(warranty).map((key) => (
          <TextField
            key={key}
            id="outlined-helperText"
            label={labels[key]}
            name={key}
            type={key.includes("Date") ? "date" : key.includes("Time") ? "time" : "text"}
            InputLabelProps={{
              shrink: true,
            }}
            value={warranty[key]}
            onChange={handleChange}
          />
        ))}
        <Button type="submit" variant="contained" color="success">Hoàn thành</Button>
        {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
      </Box>
    </div>
  );
}

export default AddWarrantyDiamondForm;
