import React from "react";
import { Button } from "react-bootstrap";
import { deleteJewelry } from "../../api/JewelryAPI.js";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteJewelryButton({ jewelryID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA trang sức này ?")) {
      try {
        await deleteJewelry(jewelryID);
        onDelete(jewelryID);
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

export default DeleteJewelryButton;
