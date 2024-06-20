import React from "react";
import { Button } from 'react-bootstrap';
import { deleteAccount } from "../../api/accountCrud";
import DeleteIcon from "@mui/icons-material/Delete";


function DeleteAccountForm({ accountID, onDelete }) {
    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc muốn XÓA tài khoản này ?')) {
            try {
                await deleteAccount(accountID);
                onDelete(accountID);
                alert('Xóa thành công');
            } catch (error) {
                alert('Xóa thất bại');
            }
        }
    };

    return (
      <Button variant="link" onClick={handleDelete} style={{ color: "red" }}>
        <DeleteIcon />
      </Button>
    );
}
export default DeleteAccountForm;