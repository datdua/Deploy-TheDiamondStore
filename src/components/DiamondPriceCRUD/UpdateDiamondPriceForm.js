import React, { useState } from "react";
import { updateDiamondPrice } from "../../api/DiamondPriceAPI.js";
import { Form, Button } from "react-bootstrap";

function UpdateDiamondPriceForm({ diamondPrice }) {
  const [updatedDiamondPrice, setUpdateDiamondPrice] = useState(diamondPrice);

  const handleChange = (event) => {
    setUpdateDiamondPrice({
      ...updatedDiamondPrice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDiamondPrice(
        diamondPrice.diamondPriceID,
        updatedDiamondPrice
      );
      alert("Cập nhật thông tin Tài Khoản thành công");
    } catch (error) {
      alert("Cập nhật thông tin Tài Khoản thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Diamond ID</Form.Label>
        <Form.Control
          type="text"
          name="diamondID"
          value={updatedDiamondPrice.diamondID}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Diamond Entry Price</Form.Label>
        <Form.Control
          type="text"
          name="diamondEntryPrice"
          value={updatedDiamondPrice.diamondEntryPrice}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Clarity</Form.Label>
        <Form.Control
          type="text"
          name="clarity"
          value={updatedDiamondPrice.clarity}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Colour</Form.Label>
        <Form.Control
          type="text"
          name="color"
          value={updatedDiamondPrice.color}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Carat Size</Form.Label>
        <Form.Control
          type="text"
          name="carat_size"
          value={updatedDiamondPrice.carat_size}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}
export default UpdateDiamondPriceForm;
