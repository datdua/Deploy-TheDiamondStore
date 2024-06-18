import React from "react";
import { Button } from "react-bootstrap";
import { deleteOrder } from "../../api/OrderAPI";

function DeleteOrderForm({ orderID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA tài khoản này ?")) {
      try {
        await deleteOrder(orderID);
        onDelete(orderID);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
}
export default DeleteOrderForm;
