import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { deleteOrderByManager } from "../../api/OrderAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Snackbar, Alert } from "@mui/material";

function DeleteOrderForm({ orderID, onDelete }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA đơn hàng này ?")) {
      try {
        await deleteOrderByManager(orderID);
        onDelete(orderID);
        setSnackbarMessage("Xóa thành công, vui lòng tải lại!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        setSnackbarMessage("Đơn hàng đã thanh toán, không thể xóa!");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Tooltip describeChild title="Xóa" arrow placement="top">
        <Button variant="link" onClick={handleDelete} style={{ color: "red" }}>
          <DeleteIcon />
        </Button>
      </Tooltip>
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
    </>
  );
}

export default DeleteOrderForm;
