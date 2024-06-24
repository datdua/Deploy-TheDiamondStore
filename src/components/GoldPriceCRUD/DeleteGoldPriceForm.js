import React from "react";
import { Button } from "react-bootstrap";
import { deleteGoldPrice } from "../../api/GoldPriceAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteGoldPriceForm({ goldPriceID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA giá của kim cương này ?")) {
      try {
        await deleteGoldPrice(goldPriceID);
        onDelete(goldPriceID);
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
export default DeleteGoldPriceForm;
