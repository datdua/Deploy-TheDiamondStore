import React from "react";
import { Button } from "react-bootstrap";
import { deleteCertificate } from "../../api/CertificateAPI";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Button variant="link" onClick={handleDelete} style={{ color: "red" }}>
      <DeleteIcon />
    </Button>
  );
}
export default DeleteCertificateForm;
