import React from "react";
import { Button } from "react-bootstrap";
import { deleteDiamondPrice } from "../../api/DiamondPriceAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteDiamondPriceForm({ diamondPriceID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA giá của kim cương này ?")) {
      try {
        await deleteDiamondPrice(diamondPriceID);
        onDelete(diamondPriceID);
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
export default DeleteDiamondPriceForm;
