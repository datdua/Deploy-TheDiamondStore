import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateOrder } from "../../api/OrderAPI";

function UpdateOrderForm({ order }) {
  const [updatedOrder, setUpdatedOrder] = useState(order);

  const handleChange = (event) => {
    setUpdatedOrder({
      ...updatedOrder,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateOrder(order.orderID, updatedOrder);
      alert("Cập nhật thông tin Kim Cương thành công");
    } catch (error) {
      alert("Cập nhật thông tin Kim Cương thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Order Status</Form.Label>
        <Form.Control
          type="text"
          name="orderStatus"
          value={updatedOrder.orderStatus}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Delivery Date</Form.Label>
        <Form.Control
          type="date"
          name="deliveryDate"
          value={updatedOrder.deliveryDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Delivery Address</Form.Label>
        <Form.Control
          type="text"
          name="deliveryAddress"
          value={updatedOrder.deliveryAddress}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Warrantity Image</Form.Label>
        <Form.Control
          type="text"
          name="warrantyImage"
          value={updatedOrder.warrantyImage}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Certification Image</Form.Label>
        <Form.Control
          type="text"
          name="certificateImage"
          value={updatedOrder.certificateImage}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Promotion Code</Form.Label>
        <Form.Control
          type="text"
          name="promotionCode"
          value={updatedOrder.promotionCode}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateOrderForm;
