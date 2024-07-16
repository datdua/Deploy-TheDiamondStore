import React, { useState } from "react";
import { createCertificate } from "../../api/CertificateAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AddCertificateForm() {
  const [certificate, setCertificate] = useState({
    certificateID: "",
    diamondID: "",
    expirationDate: "",
    expirationTime: "",
    certificateImage: "",
  });

  const [message, setMessage] = useState("");

  const labels = {
    certificateID: "Mã số chứng chỉ",
    diamondID: "Mã kim cương",
    expirationDate: "Ngày hết hạn",
    expirationTime: "Giờ hết hạn",
    certificateImage: "Giấy chứng chỉ",
  };

  const handleChange = (event) => {
    setCertificate({ ...certificate, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimeCertificate = {
        ...certificate,
        expirationDate: `${certificate.expirationDate} ${certificate.expirationTime}:00`,
      };
      const response = await createCertificate(dateTimeCertificate);
      console.log(response);
      setMessage("Tạo mới Chứng Chỉ thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Chứng Chỉ thất bại");
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
        {Object.keys(certificate).map((key) => (
          <TextField
            key={key}
            id="outlined-basic"
            label={labels[key]}
            variant="outlined"
            name={key}
            value={certificate[key]}
            onChange={handleChange}
            type={key.includes("Date") ? "date" : key.includes("Time") ? "time" : "text"}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ))}
        <Button type="submit" variant="contained" color="success">Hoàn thành</Button>
        {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
      </Box>
    </div>
  );
}

export default AddCertificateForm;
