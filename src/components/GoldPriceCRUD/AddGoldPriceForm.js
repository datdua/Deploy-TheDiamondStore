import React, { useState } from "react";
import { createGoldPrice } from "../../api/GoldPriceAPI.js";
import { Form, Button } from "react-bootstrap";

function AddGoldPriceForm() {
  const [goldPrice, setGoldPrice] = useState({
    jewelryID: "",
    goldPrice: "",
    goldAge: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setGoldPrice({
      ...goldPrice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createGoldPrice(goldPrice);
      console.log(response);
      alert("Tạo mới Giá Vàng cho Trang Sức thành công"); // Set the message on success
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data.message === "Giá vàng cho trang sức này đã tồn tại"
      ) {
        alert("Giá vàng cho trang sức này đã tồn tại"); // Set the message if gold price already exists
      } else {
        alert("Tạo mới Giá Vàng cho Trang Sức thất bại"); // Set the message on failure
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Object.keys(goldPrice).map((key) => (
          <Form.Group controlId={key} key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control
              type={
                key.includes("Date")
                  ? "date"
                  : key.includes("Time")
                  ? "time"
                  : "text"
              }
              name={key}
              value={goldPrice[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Create goldPrice
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddGoldPriceForm;
