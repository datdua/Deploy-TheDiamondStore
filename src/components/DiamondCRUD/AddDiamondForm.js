import React, { useState } from "react";
import { createDiamond } from "../../api/DiamondAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddDiamondForm() {
  const [diamond, setDiamond] = useState({
    diamondID: "",
    warrantyID: "",
    certificationID: "",
    diamondName: "",
    diamondEntryPrice: "",
    diamondImage: "",
    weight: "",
    caratSize: "",
    color: "",
    cut: "",
    clarity: "",
    shape: "",
    origin: "",
  });

  const [message, setMessage] = useState("");

  const labels = {
    diamondID: "Mã số",
    warrantyID: "Mã bảo hành",
    certificationID: "Mã chứng nhận",
    diamondName: "Tên kim cương",
    diamondEntryPrice: "Giá nhập",
    diamondImage: "Hình ảnh",
    weight: "Trọng lượng",
    caratSize: "Kích thước carat",
    color: "Màu sắc",
    cut: "Vết cắt",
    clarity: "Độ tinh khiết",
    shape: "Hình dạng",
    origin: "Xuất xứ",
  };

  const handleChange = (event) => {
    setDiamond({ ...diamond, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createDiamond(diamond);
      console.log(response);
      setMessage("Tạo mới Kim Cương thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Kim Cương thất bại");
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
          <TextField
            key={key}
            id="outlined-basic"
            label={labels[key]}
            variant="outlined"
            name={key}
            value={diamond[key]}
            onChange={handleChange}
          />
        ))}
        <Button type="submit" variant="contained" color="success">Hoàn thành</Button>
        {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
      </Box>
    </div>
  );
}

export default AddDiamondForm;
