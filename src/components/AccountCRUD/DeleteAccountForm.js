import React from "react";
import { Button } from "react-bootstrap";
import { deleteAccounts } from "../../api/accountCrud";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteAccountForm({ accountID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA các tài khoản này?")) {
      try {
        await deleteAccounts([accountID]);
        onDelete();
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  return (
    <Tooltip title="Xóa tài khoản" arrow placement="top">
      <Button variant="link" onClick={handleDelete} style={{ color: "red" }}>
        <DeleteIcon />
      </Button>
    </Tooltip>
  );
}

export default DeleteAccountForm;
