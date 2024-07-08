import React from "react";
import { Button } from "react-bootstrap";
import { deleteOrder } from "../../api/OrderAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteOrderForm({ orderID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA đơn hàng này ?")) {
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
    <Tooltip describeChild title="Xóa" arrow placement="top">
      <Button variant="link" onClick={handleDelete} style={{ color: "red" }}>
        <DeleteIcon />
      </Button>
    </Tooltip>
  );
}
export default DeleteOrderForm;
