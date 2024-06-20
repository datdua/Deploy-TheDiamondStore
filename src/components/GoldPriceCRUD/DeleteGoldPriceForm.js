import React from "react";
import { Button } from "react-bootstrap";
import { deleteGoldPrice } from "../../api/GoldPriceAPI";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Button variant="link" onClick={handleDelete} style={{ color: "red" }}>
      <DeleteIcon />Delete
    </Button>
  );
}
export default DeleteGoldPriceForm;
