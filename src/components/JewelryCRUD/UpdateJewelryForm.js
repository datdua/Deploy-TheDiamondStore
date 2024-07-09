import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateJewelry } from "../../api/JewelryAPI.js"; // Adjust this import to your file structure

function UpdateJewelryForm({ jewelry }) {
  const [updatedJewelry, setUpdatedJewelry] = useState(jewelry);

  const handleChange = (event) => {
    setUpdatedJewelry({
      ...updatedJewelry,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateJewelry(jewelry.jewelryID, updatedJewelry);
      alert("Cập nhật thông tin Trang Sức thành công");
    } catch (error) {
      alert("Cập nhật thông tin Trang Sức thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Tên trang sức</Form.Label>
        <Form.Control
          type="text"
          name="jewelryName"
          value={updatedJewelry.jewelryName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Giới tính</Form.Label>
        <Form.Control as="select" name="gender" value={updatedJewelry.gender} onChange={handleChange}>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Giá nhập</Form.Label>
        <Form.Control
          type="text"
          name="jewelryEntryPrice"
          value={updatedJewelry.jewelryEntryPrice}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Giấy trang sức</Form.Label>
        <Form.Control
          type="text"
          name="jewelryImage"
          value={updatedJewelry.jewelryImage}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
        Cập nhật
      </Button>
    </Form>
  );
}

export default UpdateJewelryForm;
