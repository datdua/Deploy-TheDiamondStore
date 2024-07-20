import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateOrder } from "../../api/OrderAPI";
import { Snackbar, Alert } from "@mui/material";

function UpdateOrderForm({ order }) {
  const [updatedOrder, setUpdatedOrder] = useState({
    orderStatus: order.orderStatus,
    deliveryDate: order.deliveryDate.split(" ")[0],
    deliveryTime: order.deliveryDate.split(" ")[1].slice(0, 5),
    deliveryAddress: order.deliveryAddress,
    phoneNumber: order.phoneNumber,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
      setSnackbarMessage("Cập nhật thông tin thành công, vui lòng tải lại trang!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Cập nhật thông tin thất bại!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Trạng thái hóa đơn</Form.Label>
        <Form.Control
          type="text"
          name="orderStatus"
          value={updatedOrder.orderStatus}
          onChange={handleChange}
          disabled
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ngày giao hàng</Form.Label>
        <Form.Control
          type="date"
          name="deliveryDate"
          value={updatedOrder.deliveryDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Thời gian giao hàng</Form.Label>
        <Form.Control
          type="time"
          name="deliveryTime"
          value={updatedOrder.deliveryTime}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Địa chỉ giao hàng</Form.Label>
        <Form.Control
          type="text"
          name="deliveryAddress"
          value={updatedOrder.deliveryAddress}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
        Cập nhật
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Form>
  );
}

export default UpdateOrderForm;