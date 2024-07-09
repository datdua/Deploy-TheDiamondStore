import React, { useState } from "react";
import { createPromotion } from "../../api/PromotionAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddPromotionForm() {
  const [promotion, setPromotion] = useState({
    promotionCode: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    discountAmount: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const labels = {
    promotionCode: "Mã Giảm Giá",
    startDate: "Ngày Bắt Đầu",
    startTime: "Giờ Bắt Đầu",
    endDate: "Ngày Kết Thúc",
    endTime: "Giờ Kết Thúc",
    discountAmount: "Số Tiền Giảm Giá",
    description: "Mô Tả",
  };

  const handleChange = (event) => {
    setPromotion({ ...promotion, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimePromotion = {
        ...promotion,
        startDate: `${promotion.startDate} ${promotion.startTime}:00`,
        endDate: `${promotion.endDate} ${promotion.endTime}:00`,
      };
      const response = await createPromotion(dateTimePromotion);
      console.log(response);
      setMessage("Tạo mới Mã Giảm Giá thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Mã Giảm Giá thất bại");
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
        {Object.keys(promotion).map((key) => (
          <TextField
            key={key}
            id="outlined-basic"
            label={labels[key]}
            variant="outlined"
            name={key}
            value={promotion[key]}
            onChange={handleChange}
            type={
              key.includes("Date")
                ? "date"
                : key.includes("Time")
                  ? "time"
                  : "text"
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        ))}
        <Button type="submit" variant="contained" color="success">Tạo Mã Giảm Giá</Button>
        {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
      </Box>
    </div>
  );
}

export default AddPromotionForm;