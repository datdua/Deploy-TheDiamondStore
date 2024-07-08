import React, { useState } from "react";
import { updatePromotion } from "../../api/PromotionAPI.js";
import { Form, Button } from "react-bootstrap";

function UpdatePromotionForm({ promotion }) {
  const [updatedPromotion, setUpdatedPromotion] = useState({
    promotionCode: promotion.promotionCode,
    startDate: promotion.startDate.split(" ")[0],
    startTime: promotion.startDate.split(" ")[1].slice(0, 5),
    endDate: promotion.endDate.split(" ")[0],
    endTime: promotion.endDate.split(" ")[1].slice(0, 5),
    discountAmount: promotion.discountAmount,
    description: promotion.description,
  });

  const handleChange = (event) => {
    setUpdatedPromotion({
      ...updatedPromotion,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimePromotion = {
        ...updatedPromotion,
        startDate: `${updatedPromotion.startDate} ${updatedPromotion.startTime}:00`,
        endDate: `${updatedPromotion.endDate} ${updatedPromotion.endTime}:00`,
      };
      await updatePromotion(promotion.promotionID, dateTimePromotion);
      alert("Cập nhật thông tin Giấy Bảo Hành thành công");
    } catch (error) {
      alert("Cập nhật thông tin Giấy Bảo Hành thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Mã giảm giá</Form.Label>
        <Form.Control
          type="text"
          name="promotionCode"
          value={updatedPromotion.promotionCode}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ngày bắt đầu</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={updatedPromotion.startDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Thời gian bắt đầu</Form.Label>
        <Form.Control
          type="time"
          name="startTime"
          value={updatedPromotion.startTime}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ngày kết thúc</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={updatedPromotion.endDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Thời gian kết thúc</Form.Label>
        <Form.Control
          type="time"
          name="endTime"
          value={updatedPromotion.endTime}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Số tiền chiết khấu</Form.Label>
        <Form.Control
          type="number"
          name="discountAmount"
          value={updatedPromotion.discountAmount}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={updatedPromotion.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
        Cập nhật
      </Button>
    </Form>
  );
}

export default UpdatePromotionForm;
