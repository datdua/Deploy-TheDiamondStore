import React, { useState } from "react";
import { updateDiamond } from "../../api/DiamondAPI.js";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function UpdateDiamondForm({ diamond }) {
  const [updatedDiamond, setUpdatedDiamond] = useState(diamond);

  const colorOptions = ["F", "E", "J", "D"];
  const clarityOptions = ["VS1", "VS2", "VVS1", "VVS2"];
  const shapeOptions = ["Round", "Pear", "Radiant"];

  const handleChange = (event) => {
    setUpdatedDiamond({
      ...updatedDiamond,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDiamond(diamond.diamondID, updatedDiamond);
      alert("Cập nhật thông tin Kim Cương thành công");
    } catch (error) {
      alert("Cập nhật thông tin Kim Cương thất bại");
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
        <TextField
          id="diamondID"
          label="Mã kim cương"
          variant="outlined"
          name="diamondID"
          value={updatedDiamond.diamondID}
          onChange={handleChange}
          type="text"
        />
        <TextField
          id="diamondName"
          label="Tên kim cương"
          variant="outlined"
          name="diamondName"
          value={updatedDiamond.diamondName}
          onChange={handleChange}
          type="text"
        />
        <TextField
          id="diamondImage"
          label="Hình ảnh kim cương"
          variant="outlined"
          name="diamondImage"
          value={updatedDiamond.diamondImage}
          onChange={handleChange}
          type="text"
        />
        <TextField
          id="weight"
          label="Trọng lượng"
          variant="outlined"
          name="weight"
          value={updatedDiamond.weight}
          onChange={handleChange}
          type="text"
        />
        <TextField
          id="caratSize"
          label="Kích thước"
          variant="outlined"
          name="caratSize"
          value={updatedDiamond.caratSize}
          onChange={handleChange}
          type="text"
        />
        <FormControl fullWidth>
          <InputLabel id="color-select-label">Màu</InputLabel>
          <Select
            labelId="color-select-label"
            id="color-select"
            value={updatedDiamond.color}
            label="Màu"
            name="color"
            onChange={handleChange}
          >
            {colorOptions.map((color) => (
              <MenuItem key={color} value={color}>{color}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="cut"
          label="Vết cắt"
          variant="outlined"
          name="cut"
          value={updatedDiamond.cut}
          onChange={handleChange}
          type="text"
          InputProps={{
            readOnly: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="clarity-select-label">Độ tinh khiết</InputLabel>
          <Select
            labelId="clarity-select-label"
            id="clarity-select"
            value={updatedDiamond.clarity}
            label="Độ tinh khiết"
            name="clarity"
            onChange={handleChange}
          >
            {clarityOptions.map((clarity) => (
              <MenuItem key={clarity} value={clarity}>{clarity}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="shape-select-label">Hình dạng</InputLabel>
          <Select
            labelId="shape-select-label"
            id="shape-select"
            value={updatedDiamond.shape}
            label="Hình dạng"
            name="shape"
            onChange={handleChange}
          >
            {shapeOptions.map((shape) => (
              <MenuItem key={shape} value={shape}>{shape}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="origin"
          label="Xuất xứ"
          variant="outlined"
          name="origin"
          value={updatedDiamond.origin}
          onChange={handleChange}
          type="text"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="quantity"
          label="Số lượng"
          variant="outlined"
          name="quantity"
          value={updatedDiamond.quantity}
          onChange={handleChange}
          type="text"
        />
        <Button type="submit" variant="contained" color="success">Cập nhật</Button>
      </Box>
    </div>
  );
}

export default UpdateDiamondForm;
