import React from "react";
import { Button } from "react-bootstrap";
import { deleteWarranty } from "../../api/WarrantyAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteWarrantyForm({ warrantyID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA warranty này ?")) {
      try {
        await deleteWarranty(warrantyID);
        onDelete(warrantyID);
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
export default DeleteWarrantyForm;
