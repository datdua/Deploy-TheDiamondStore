import React, { useEffect, useState } from "react";
import { createWarranty } from "../../api/WarrantyAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AddWarrantyJewelryForm() {
    const [warranty, setWarranty] = useState({
        warrantyID: "",
        jewelryID: "",
        warrantyImage: "",
    });

    const [message, setMessage] = useState("");

    const labels = {
        warrantyID: "Mã giấy bảo hành",
        jewelryID: "Mã trang sức",
        warrantyImage: "Giấy bảo hành",
    };

    const handleChange = (event) => {
        setWarranty({ ...warranty, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        if (warranty.startDate) {
            const startDate = new Date(warranty.startDate);
            const expirationDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1)).toISOString().split('T')[0];
            setWarranty((prev) => ({ ...prev, expirationDate }));
        }
    }, [warranty.startDate]);

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
                        id="outlined-basic"
                        label={labels[key]}
                        name={key}
                        value={warranty[key]}
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

export default AddWarrantyJewelryForm;
