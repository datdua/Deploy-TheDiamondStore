import React from "react";
import { Button } from "react-bootstrap";
import { deleteDiamond } from "../../api/DiamondAPI.js"; // Adjust this import to your file structure
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteDiamondButton({ diamondID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA kim cương này ?")) {
      try {
        await deleteDiamond(diamondID);
        onDelete(diamondID);
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

export default DeleteDiamondButton;
