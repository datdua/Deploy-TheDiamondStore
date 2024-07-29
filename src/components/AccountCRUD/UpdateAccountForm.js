import React, { useState } from "react";
import { updateAccountByAdmin } from "../../api/accountCrud";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function UpdateAccountForm({ account }) {
  const [updatedAccount, setUpdateAccount] = useState(account);

  const labels = {
    email: "Email",
    accountName: "Tên Tài Khoản",
    password: "Mật Khẩu",
    phoneNumber: "Số Điện Thoại",
    role: "Vai Trò",
    addressAccount: "Địa Chỉ",
  };

  const handleChange = (event) => {
    setUpdateAccount({
      ...updatedAccount,
      [event.target.name]: event.target.value,
    });
  };

  const handleActiveStatusChange = (event) => {
    setUpdateAccount({
      ...updatedAccount,
      active: event.target.value === "true", 
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateAccountByAdmin(account.accountID, updatedAccount);
      alert("Cập nhật thông tin Tài Khoản thành công");
    } catch (error) {
      alert("Cập nhật thông tin Tài Khoản thất bại");
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
        {Object.keys(labels).map((key) => (
          <TextField
            key={key}
            label={labels[key]}
            variant="outlined"
            name={key}
            value={updatedAccount[key]}
            onChange={handleChange}
            type="text"
          />
        ))}
        <FormControl fullWidth>
          <InputLabel id="active-status-label">Trạng Thái</InputLabel>
          <Select
            labelId="active-status-label"
            id="active-status"
            value={updatedAccount.active.toString()}
            label="Trạng Thái"
            onChange={handleActiveStatusChange}
            name="active"
          >
            <MenuItem value="true">Đang kích hoạt</MenuItem>
            <MenuItem value="false">Chưa kích hoạt</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="success">Cập nhật</Button>
      </Box>
    </div>
  );
}
export default UpdateAccountForm;