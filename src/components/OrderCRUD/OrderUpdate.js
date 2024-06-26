import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateOrder } from "../../api/OrderAPI";

function UpdateOrderForm({ order }) {
  const [updatedOrder, setUpdatedOrder] = useState({
    orderStatus: order.orderStatus,
    deliveryDate: order.deliveryDate.split(" ")[0],
    deliveryTime: order.deliveryDate.split(" ")[1].slice(0, 5),
    deliveryAddress: order.deliveryAddress,
    phoneNumber: order.phoneNumber,
    warrantyImage: order.warrantyImage,
    certificateImage: order.certificateImage,

  });

  const handleChange = (event) => {
    setUpdatedOrder({
      ...updatedOrder,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimeDelivery = {
        ...updatedOrder,
        deliveryDate: `${updatedOrder.deliveryDate} ${updatedOrder.deliveryTime}:00`,
      };
      await updateOrder(order.orderID, dateTimeDelivery);
      alert("Cập nhật thông tin Order thành công");
    } catch (error) {
      alert("Cập nhật thông tin Order thất bại");
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
        <Form.Label>Delivery Time</Form.Label>
        <Form.Control
          type="time"
          name="deliveryTime"
          value={updatedOrder.deliveryTime}
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
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateOrderForm;
