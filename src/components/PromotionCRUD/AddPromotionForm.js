import React, { useState } from "react";
import { createPromotion } from "../../api/PromotionAPI.js";
import { Form, Button } from "react-bootstrap";

function AddPromotionForm() {
  const [promotion, setPromotion] = useState({
    promotionCode: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    discountAmount: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setPromotion({ ...promotion, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimePromotion = {
        ...promotion,
        startDate: `${promotion.startDate} ${promotion.startTime}:00`,
        endDate: `${promotion.endDate} ${promotion.endTime}:00`,
      };
      const response = await createPromotion(dateTimePromotion);
      console.log(response);
      setMessage("Tạo mới Mã Giảm Giá thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Mã Giảm Giá thất bại");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Object.keys(promotion).map((key) => (
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
              value={promotion[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Tạo Mã Giảm Giá
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddPromotionForm;
