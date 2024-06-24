import React, { useState } from "react";
import { updateGoldPrice } from "../../api/GoldPriceAPI.js";
import { Form, Button } from "react-bootstrap";

function UpdateGoldPriceForm({ goldPrice }) {
  const [updatedGoldPrice, setUpdateGoldPrice] = useState(goldPrice);

  const handleChange = (event) => {
    setUpdateGoldPrice({
      ...updatedGoldPrice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateGoldPrice(goldPrice.goldpriceID, updatedGoldPrice);
      alert("Cập nhật thông tin Giá Vàng thành công");
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data.message === "Giá vàng này đã tồn tại"
      ) {
        alert("Giá vàng cho trang sức này đã tồn tại");
      }
      alert("Cập nhật thông tin Giá Vàng thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Jewelry ID</Form.Label>
        <Form.Control
          type="text"
          name="jewelryID"
          value={updatedGoldPrice.jewelryID}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gold Price</Form.Label>
        <Form.Control
          type="text"
          name="goldPrice"
          value={updatedGoldPrice.goldPrice}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gold Age</Form.Label>
        <Form.Control
          type="integer"
          name="goldAge"
          value={updatedGoldPrice.goldAge}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}
export default UpdateGoldPriceForm;
