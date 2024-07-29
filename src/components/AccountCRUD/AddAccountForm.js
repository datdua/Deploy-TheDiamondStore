import React, { useState } from "react";
import { createAccount } from "../../api/accountCrud"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function AddAccountForm() {
    const [account, setAccount] = useState({
        accountName: "",
        email: "",
        password: "",
        phoneNumber: "",
        addressAccount: "",
        role: "",
    });

    const [message, setMessage] = useState("");

    const labels = {
        accountName: "Tên tài khoản",
        email: "Email",
        password: "Mật khẩu",
        phoneNumber: "Số điện thoại",
        addressAccount: "Địa chỉ",
        role: "Vai trò",
    };

    const options = {
        role: ["ROLE_MANAGER", "ROLE_CUSTOMER", "ROLE_SALE-STAFF"],
    };

    const handleChange = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createAccount(account);
            console.log(response);
            setMessage(response.message || "Tạo mới tài khoản thành công");
        } catch (error) {
            let errorMessage = "Tạo mới tài khoản thất bại";
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
                {Object.keys(account).map((key) => (
                    options[key] ? (
                        <TextField
                            key={key}
                            id={`select-${key}`}
                            select
                            label={labels[key]}
                            value={account[key]}
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
                    ) :
                    <TextField
                        key={key}
                        id="outlined-basic"
                        label={labels[key]}
                        variant="outlined"
                        name={key}
                        value={account[key]}
                        onChange={handleChange}
                        type="text"
                        required={key !== "phoneNumber"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                ))}
                <Button type="submit" variant="contained" color="success">Tạo tài khoản</Button>
                {message && <p style={{ color: '#F2BA59', fontWeight: 'bold' }}>{message}</p>}
            </Box>
        </div>
    );
}

export default AddAccountForm;