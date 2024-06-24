import React, { useState } from "react";
import { updateWarranty } from "../../api/WarrantyAPI.js";
import { Form, Button } from "react-bootstrap";

function UpdateWarrantyForm({ warranty }) {
  const [updatedWarranty, setUpdatedWarranty] = useState({
    diamondID: warranty.diamondID,
    expirationDate: warranty.expirationDate.split(" ")[0],
    expirationTime: warranty.expirationDate.split(" ")[1].slice(0, 5),
    warrantyImage: warranty.warrantyImage,
  });

  const handleChange = (event) => {
    setUpdatedWarranty({
      ...updatedWarranty,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimeWarranty = {
        ...updatedWarranty,
        expirationDate: `${updatedWarranty.expirationDate} ${updatedWarranty.expirationTime}:00`,
      };
      await updateWarranty(warranty.warrantyID, dateTimeWarranty);
      alert("Cập nhật thông tin Giấy Bảo Hành thành công");
    } catch (error) {
      alert("Cập nhật thông tin Giấy Bảo Hành thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Jewelry ID</Form.Label>
        <Form.Control
          type="text"
          name="jewelryID"
          value={updatedWarranty.jewelryID}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control
          type="date"
          name="expirationDate"
          value={updatedWarranty.expirationDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Expiration Time</Form.Label>
        <Form.Control
          type="time"
          name="expirationTime"
          value={updatedWarranty.expirationTime}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Warranty Image</Form.Label>
        <Form.Control
          type="text"
          name="warrantyImage"
          value={updatedWarranty.warrantyImage}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update warranty
      </Button>
    </Form>
  );
}

export default UpdateWarrantyForm;
