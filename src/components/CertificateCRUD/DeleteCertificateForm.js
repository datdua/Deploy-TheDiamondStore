import React from "react";
import { Button } from "react-bootstrap";
import { deleteCertificate } from "../../api/CertificateAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteCertificateForm({ certificateID, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA certificate này ?")) {
      try {
        await deleteCertificate(certificateID);
        onDelete(certificateID);
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
export default DeleteCertificateForm;
